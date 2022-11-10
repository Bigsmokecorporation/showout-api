import AuthService from './AuthService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents user authentication.
 * @author Kwame Twum
 * @since 09/11/2022
 */
class AuthController {

    static async login(rq, rs) {
        const {email, password} = rq.body;
        if (!(email && password))
            UtilFunctions.outputError(rs, "Please specify login details");
        try {
            const data = await AuthService.login(rq, rs);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Login failed. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async appleLogin(rq, rs) {
        if (!rq.body.access_token)
            UtilFunctions.outputError(rs, "Please specify token");

        try {
            const data = await AuthService.loginWithApple(rq, rs);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Apple login failed. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error);
        }
    }

    static async faceBookLogin(rq, rs) {
        if (!(rq.body.user_id && rq.body.access_token))
            UtilFunctions.outputError(rs, "Please specify token");

        try {
            const data = await AuthService.loginWithFaceBook(rq, rs);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`FaceBook login failed. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error);
        }
    }

    static async googleLogin(rq, rs) {
        if (!rq.body.access_token)
            UtilFunctions.outputError(rs, "Please specify token");

        try {
            const data = await AuthService.loginWithGoogle(rq, rs);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Google login failed. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error);
        }
    }

}

export default AuthController;