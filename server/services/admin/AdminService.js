import UtilFunctions from "../../util/UtilFunctions.js";
import AdminModel from "../../models/admin.model.js";
import bCrypt from "bcryptjs";
import UserModel from "../../models/user.model.js";
import ResponseCodes from "../../util/ResponseCodes.js";
import HttpStatus from "../../util/HttpStatus.js";

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
        const admin = await AdminModel.get(email, true)

        if (!admin || !(await bCrypt.compare(password, admin.password)))
            throw new ShowOutError('Please check and re-enter details correctly')
        else {
            await UtilFunctions.tokenizeUser(admin)
            await AdminModel.update(admin.id, {refresh_token: admin.refresh_token})
            rs.locals.admin = admin
            return admin
        }
    }
}

export default AdminService;
