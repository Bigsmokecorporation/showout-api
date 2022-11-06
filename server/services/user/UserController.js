import UserService from './UserService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents controller.
 */
class UserController {

    /**
     * @desc This function gets user details
     * @author Kwame Twum
     * @since 05/11/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async get(rq, rs) {
        try {
            const data = await UserService.get(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Getting error while Gets user details. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    /**
     * @desc This function creates a new user
     * @author Kwame Twum
     * @since 05/11/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async create(rq, rs) {
        const {full_name, email} = rq.body;
        if (!(email && full_name))
            UtilFunctions.outputError(rs, "All items are required");

        try {
            const data = await UserService.create(rq.body, rs);
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Getting error while Gets user details. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    /**
     * @desc This function updates a user account
     * @author Kwame Twum
     * @since 05/11/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async update(rq, rs) {
        const {id} = rq.body;
        if (!id) UtilFunctions.outputError(rs, "No user id specified");
        const data = await UserService.update(rq.body, rs, rs.locals.user);
        UtilFunctions.outputSuccess(rs, data)
    }

}

export default UserController;
