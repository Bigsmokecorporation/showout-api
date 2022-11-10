import {OAuth2Client} from 'google-auth-library'
import UserModel from "../../models/user.model.js"
import randToken from "rand-token"
import jwt from "jsonwebtoken"
import bCrypt from 'bcryptjs'

/**
 * Class represents user authentication services.
 * @author Kwame Twum
 * @since 09/11/2022
 */
class AuthService {

    static async login (rq, rs) {
        const {email, password} = rq.body
        const user = await UserModel.get(email, true)
        if (!user || !(await bCrypt.compare(password, user.password)))
            throw new ShowOutError('Please check and re-enter details correctly')
        else {
            delete user.password
            user.token = await jwt.sign({id: user.id}, process.env.JWT, {expiresIn: "1h"})
            let refresh_token = randToken.uid(256)
            user.refresh_token = refresh_token
            await UserModel.update(user.id, {refresh_token})
            rs.locals.user = user
            return user
        }
    }
    
    static async loginWithApple (rq, rs) {
        const {user_id, access_token, gcid} = rq.body


    }

    static async loginWithFaceBook (rq, rs) {
        const {user_id, access_token, gcid} = rq.body
        const url = `https://graph.facebook.com/v9.0/${user_id}/?fields=id,name,email&access_token=${access_token}`

    }

    static async loginWithGoogle (rq, rs) {
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
}

export default AuthService
