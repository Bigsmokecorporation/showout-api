import {OAuth2Client} from 'google-auth-library'
import UserModel from "../../models/user.model.js"
import randToken from "rand-token"
import jwt from "jsonwebtoken"
import bCrypt from 'bcryptjs'
import HttpStatus from "../../util/HttpStatus.js";
import ResponseCodes from "../../util/ResponseCodes.js";

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
                user.token = await jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '1h'})
                let refresh_token = randToken.uid(256)
                user.refresh_token = refresh_token
                await UserModel.update(user.id, {refresh_token})
                rs.locals.user = user
                return user
            }
        }
    }

    static async loginWithApple(rq, rs) {
        const {user_id, access_token, gcid} = rq.body


    }

    static async loginWithFaceBook(rq, rs) {
        const {user_id, access_token, gcid} = rq.body
        const url = `https://graph.facebook.com/v9.0/${user_id}/?fields=id,name,email&access_token=${access_token}`

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
        console.log(payload)
        const userid = payload['sub']
    }

    static async verify(rq, rs) {
        const {id, token} = rq.body
        const hasPendingVerification = await UserModel.hasPendingVerification(id)
        if (hasPendingVerification) {
            const valid = await UserModel.validateVerificationToken(id, token)
            if (valid) {
                await UserModel.update(id, { is_active: valid, email_verified: valid })
                await UserModel.updateVerificationStatus(id, valid)
            }
            else
                throw new ShowOutError('Token verification failed', ResponseCodes.INVALID_CODE)
        } else
            throw new ShowOutError(`There's no pending verification for this user`)
    }
}

export default AuthService
