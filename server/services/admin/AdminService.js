import UtilFunctions from "../../util/UtilFunctions.js";
import AdminModel from "../../models/admin.model.js";
import bCrypt from "bcryptjs";
import ResponseCodes from "../../util/ResponseCodes.js";

/**
 * Class represents services.
 */
class AdminService {

    /**
     * @desc This function is being used
     * @author Kwame Twum
     * @since 15/11/2022
     * @param {Object} rq Request
     * @param {Object} rs
     */
    static async login(rq, rs) {
        const {email, password} = rq.body
        const admin = await AdminModel.get(email)

        if (!admin || !(await bCrypt.compare(password, admin.password)))
            throw new ShowOutError('Please check and re-enter details correctly')
        else {
            delete admin.password
            await UtilFunctions.tokenizeUser(admin)
            await AdminModel.update(admin.id, {refresh_token: admin.refresh_token})
            rs.locals.admin = admin
            return admin
        }
    }

    static async refreshToken(rq) {
        const {id, refresh_token} = rq.body
        const admin = await AdminModel.get(id)
        if (admin.refresh_token === refresh_token) {
            await UtilFunctions.tokenizeUser(admin)
            await AdminModel.update(admin.id, {refresh_token: admin.refresh_token})
            return admin
        } else
            throw new ShowOutError('Failed to validate refresh token', {}, ResponseCodes.INVALID_REFRESH_TOKEN)
    }
}

export default AdminService;
