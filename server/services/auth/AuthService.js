import {OAuth2Client} from 'google-auth-library'
import UserModel from "../../models/user.model.js"
import bCrypt from 'bcryptjs'
import HttpStatus from "../../util/HttpStatus.js";
import ResponseCodes from "../../util/ResponseCodes.js";
import UtilFunctions from "../../util/UtilFunctions.js";
import EmailModel from "../../models/email.model.js";
import Requests from "../../util/Requests.js";
import self from "../../models/user.model.js";

/**
 * Class represents user authentication services.
 * @author Kwame Twum
 * @since 09/11/2022
 */
class AuthService {

    static async login(rq, rs) {
        const {email, password} = rq.body
        const user = await UserModel.get(email, true)
        if (!user || !(await bCrypt.compare(password, user.password)))
            throw new ShowOutError('Please check and re-enter details correctly')
        else {
            const hasPendingVerification = await UserModel.hasPendingVerification(user.id)
            if (!user.email_verified || hasPendingVerification) {
                // resend mail
                // const pendingVerification = await UserModel.pendingVerification(current_user.id)
                // await EmailModel.sendVerificationMail(user.id, current_user.full_name, pendingVerification[0].token)
                throw new ShowOutError("Please check your mail for a verification code", user, ResponseCodes.VERIFICATION_PENDING, HttpStatus.FOUND)
            } else {
                delete user.password
                await UtilFunctions.tokenizeUser(user)
                await UserModel.update(user.id, {refresh_token: user.refresh_token})
                rs.locals.user = user
                return user
            }
        }
    }

    static async loginWithApple(rq, rs) {
        const {full_name, email, gcid} = rq.body
        let user = await self.get(email)
        if (user) {
            user.new_social_login = false
            if (gcid) await UserModel.update(email, {gcid})
            await UtilFunctions.tokenizeUser(user)
            return user
        } else {
            let created_user = await UserModel.create({
                id: UtilFunctions.genId(),
                email,
                full_name,
                email_verified: true,
                is_social_login: true,
                social_login_token: 'apple',
                ...(gcid && {gcid})
            })
            created_user.new_social_login = true
            return created_user
        }

    }

    static async loginWithFaceBook(rq, rs) {
        const {user_id, access_token, gcid} = rq.body
        const url = `https://graph.facebook.com/v9.0/${user_id}/?fields=id,name,email,picture&access_token=${access_token}`
        const payload = await Requests.get(url)
        let user = await self.get(payload.email)
        if (user) {
            user.new_social_login = false
            if (gcid) await UserModel.update(payload.email, {gcid})
            await UtilFunctions.tokenizeUser(user)
            return user
        } else {
            let created_user = await UserModel.create({
                id: UtilFunctions.genId(),
                email: payload.email,
                full_name: payload.name,
                email_verified: true,
                is_social_login: true,
                social_login_token: 'facebook',
                ...(payload.picture && {photo_url: payload.picture.data.url}),
                ...(gcid && {gcid})
            })
            created_user.new_social_login = true
            return created_user
        }
    }

    static async loginWithGoogle(rq, rs) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
        const {access_token, gcid} = rq.body
        const ticket = await client.verifyIdToken({
            idToken: access_token,
            audience: [
                process.env.GOOGLE_OAUTH_IOS,
                process.env.GOOGLE_OAUTH_WEB
            ]
        })
        const payload = ticket.getPayload()
        let user = await self.get(payload.email)
        if (user) {
            user.new_social_login = false
            if (gcid) await UserModel.update(payload.sub, {gcid})
            await UtilFunctions.tokenizeUser(user)
            return user
        } else {
            let created_user = await UserModel.create({
                id: payload.sub,
                email: payload.email,
                full_name: payload.name,
                email_verified: true,
                is_social_login: true,
                social_login_token: 'google',
                ...(payload.picture && {photo_url: payload.picture}),
                ...(gcid && {gcid})
            })
            created_user.new_social_login = true
            return created_user
        }
    }

    static async verify(rq, rs) {
        const {id, token} = rq.body
        const hasPendingVerification = await UserModel.hasPendingVerification(id)
        if (hasPendingVerification) {
            const valid = await UserModel.validateVerificationToken(id, token)
            if (valid) {
                await UserModel.updateVerificationStatus(id, valid)
                const updated_user = await UserModel.update(id, {is_active: valid, email_verified: valid})
                await UtilFunctions.tokenizeUser(updated_user)
                await UserModel.update(updated_user.id, {refresh_token: updated_user.refresh_token})
                rs.locals.user = updated_user
                return updated_user
            } else
                throw new ShowOutError('Token verification failed', ResponseCodes.INVALID_CODE)
        } else
            throw new ShowOutError(`There's no pending verification for this user`)
    }

    static async refreshToken(rq, rs) {
        const {id, refresh_token} = rq.body;
        const user = await UserModel.get(id)
        if (user.refresh_token === refresh_token) {
            await UtilFunctions.tokenizeUser(user)
            await UserModel.update(user.id, {refresh_token: user.refresh_token})
            return user
        } else
            throw new ShowOutError('Failed to validate refresh token', {}, ResponseCodes.INVALID_REFRESH_TOKEN)
    }

    static async forgotPassword(rq, rs) {
        const {email} = rq.body
        const user = await UserModel.get(email)
        let token = UtilFunctions.genId(30)
        await self.createVerification(user.id, token)
        await EmailModel.sendMailUsingTemplate(process.env.PASS_RESET_TMP, user.id, {
            id: user.id,
            token: token
        }, email);

    }
}

export default AuthService
