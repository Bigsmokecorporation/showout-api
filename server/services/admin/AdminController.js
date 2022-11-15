import AdminService from './AdminService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents controller.
 */
class AdminController {

    /**
     * @desc This function logs an admin in
     * @author Kwame Twum
     * @since 15/11/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async login (rq, rs) {
        const {email, password} = rq.body
        if (!(email && password))
            UtilFunctions.outputError(rs, "Please specify both email and password details")
        try {
            const data = await AdminService.login(rq, rs)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Admin login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, error.data || {}, error.responseCode)
        }
    }

    static async refreshToken(rq, rs) {
        const {refresh_token} = rq.body
        if (!refresh_token)
            UtilFunctions.outputError(rs, "Please specify refresh token")

        try {
            const data = await AdminService.refreshToken(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Refreshing token failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

}
export default AdminController;
