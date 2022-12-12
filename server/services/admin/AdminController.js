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
            return UtilFunctions.outputError(rs, "Please specify both email and password details")
        try {
            const data = await AdminService.login(rq, rs)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Admin login failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, error.data || {}, error.responseCode)
        }
    }

    static async forgotPassword(rq, rs) {
        const {email} = rq.body
        if (!email)
            return UtilFunctions.outputError(rs, "Email is required");
        try {
            const data = await AdminService.forgotPassword(rq)
            UtilFunctions.outputSuccess(rs, data, 'Check email for a password reset link')
        } catch (error) {
            WRITE.error(`Password reset failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

    static async verify(rq, rs) {
        const {id, token} = rq.body
        if (!(id && token))
            return UtilFunctions.outputError(rs, "Please specify both token and id")

        try {
            const data = await AdminService.verify(rq, rs)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Verification failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message)
        }
    }

    static async refreshToken(rq, rs) {
        const {refresh_token} = rq.body
        if (!refresh_token)
            return UtilFunctions.outputError(rs, "Please specify refresh token")

        try {
            const data = await AdminService.refreshToken(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Refreshing token failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

    static async getUsers (rq, rs) {
        try {
            const data = await AdminService.getUsers(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Fetching users failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }


    //  ADMINS


    /**
     * @desc This function creates an admin account
     * @author Kwame Twum
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async create(rq, rs) {
        const {full_name, email, role_id, password} = rq.body;
        if (!(email && full_name && role_id && password))
            return UtilFunctions.outputError(rs, "All items are required");

        try {
            const data = await AdminService.create(rq.body, rs);
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Failed to create admin. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode);
        }
    }

    /**
     * @desc This function updates an admin user account
     * @author Kwame Twum
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async update(rq, rs) {
        try {
            const data = await AdminService.update(rq);
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Failed to update admin user. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }
    static async get(rq, rs) {
        try {
            const data = await AdminService.getAdmin(rq);
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Failed to retrieve admin user. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async getAdmins (rq, rs) {
        try {
            const data = await AdminService.getAdmins(rq)
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Fetching admin users failed. Error stack: ${error.stack}`)
            UtilFunctions.outputError(rs, error.message, {}, error.responseCode)
        }
    }

}
export default AdminController;
