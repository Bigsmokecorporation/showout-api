import AuthService from './AuthService.js'
import UtilFunctions from "../../util/UtilFunctions.js"

/**
 * Class represents user authentication.
 * @author Kwame Twum
 * @since 09/11/2022
 */
class AuthController {

    static async login(rq, rs) {
        const {email, password} = rq.body
        if (!(email && password))
            UtilFunctions.outputError(rs, "Please specify login details")
        try {
            const data = await AuthService.login(rq, rs)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, error.data || {}, error.responseCode)
        }
    }

    static async appleLogin(rq, rs) {
        if (!(rq.body.access_token))
            return UtilFunctions.outputError(rs, "Please specify access_token")

        try {
            const data = await AuthService.loginWithApple(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Apple login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error)
        }
    }

    static async faceBookLogin(rq, rs) {
        if (!(rq.body.user_id && rq.body.access_token))
            UtilFunctions.outputError(rs, "Please specify token")

        try {
            const data = await AuthService.loginWithFaceBook(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`FaceBook login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error)
        }
    }

    static async googleLogin(rq, rs) {
        if (!rq.body.access_token)
            UtilFunctions.outputError(rs, "Please specify token")

        try {
            const data = await AuthService.loginWithGoogle(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Google login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error)
        }
    }

    static async verify(rq, rs) {
        const {id, token} = rq.body
        if (!(id && token))
            UtilFunctions.outputError(rs, "Please specify both token and id")

        try {
            const data = await AuthService.verify(rq, rs)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Verification failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message)
        }
    }

    static async refreshToken(rq, rs) {
        const {refresh_token} = rq.body
        if (!refresh_token)
            UtilFunctions.outputError(rs, "Please specify refresh token")

        try {
            const data = await AuthService.refreshToken(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Refreshing token failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

    static async forgotPassword(rq, rs) {
        const {email} = rq.body
        if (!email)
            UtilFunctions.outputError(rs, "Email is required");
        try {
            const data = await AuthService.forgotPassword(rq)
            UtilFunctions.outputSuccess(rs, data, 'Check email for a password reset link')
        } catch (error) {
            WRITE.error(`Password rest failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

}

export default AuthController
