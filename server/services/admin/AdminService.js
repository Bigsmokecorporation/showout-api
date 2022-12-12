import UtilFunctions from "../../util/UtilFunctions.js"
import AdminModel from "../../models/admin.model.js"
import bCrypt from "bcryptjs"
import ResponseCodes from "../../util/ResponseCodes.js"
import UserModel from "../../models/user.model.js"
import HttpStatus from "../../util/HttpStatus.js"
import EmailModel from "../../models/email.model.js"

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

    static async forgotPassword(rq) {
        const {email} = rq.body
        const admin = await AdminModel.get(email)
        if (!admin)
            throw new ShowOutError('Failed to identify user', {})

        let token = UtilFunctions.genId(30)
        await UserModel.createVerification(admin.id, token)
        await EmailModel.sendMailUsingTemplate(process.env.PASS_RESET_TMP, admin.id, {
            full_name: admin.full_name,
            id: admin.id,
            token: token
        }, email)
    }

    static async verify(rq, rs) {
        const {id, token} = rq.body
        const hasPendingVerification = await UserModel.hasPendingVerification(id)
        if (hasPendingVerification) {
            const valid = await UserModel.validateVerificationToken(id, token)
            if (valid) {
                await UserModel.updateVerificationStatus(id, valid)
                const updated_admin = await AdminModel.update(id, {is_active: valid})
                await UtilFunctions.tokenizeUser(updated_admin)
                await UserModel.update(updated_admin.id, {refresh_token: updated_admin.refresh_token})
                rs.locals.admin = updated_admin
                return updated_admin
            } else
                throw new ShowOutError('Token verification failed', ResponseCodes.INVALID_CODE)
        } else
            throw new ShowOutError(`There's no pending verification for this user`)
    }

    static async getUsers(rq) {
        const users = await UserModel.getMultiple(rq.query)
        if (users)
            return users
        else
            throw new ShowOutError('Failed to retrieve users', [], ResponseCodes.FAILED)
    }


    //  ADMINS

    static async create(data, rs) {
        let current_user = await AdminModel.get(data.email)
        if (current_user)
            throw new ShowOutError("Account already exists.", {}, ResponseCodes.ALREADY_EXISTS, HttpStatus.CONFLICT)
        else {

            // create
            let admin = await AdminModel.create({...({id: UtilFunctions.genId()}), ...(data)})

            if (admin) {
                return admin
            } else {
                UtilFunctions.outputError(rs, 'An error occurred', {}, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }

    static async getAdmin(rq) {
        const user = await AdminModel.get(rq.query)
        if (user)
            return user
        else
            throw new ShowOutError('Failed to retrieve admin user', [], ResponseCodes.FAILED)
    }

    static async getAdmins(rq) {
        const users = await AdminModel.getMultiple(rq.query)
        if (users)
            return users
        else
            throw new ShowOutError('Failed to retrieve admin users', [], ResponseCodes.FAILED)
    }

    static async update(rq) {
        const data = rq.body
        const updated_admin = await AdminModel.update(rq.params.id, data)
        if (updated_admin)
            return updated_admin
        throw new ShowOutError('Update failed')
    }
}

export default AdminService
