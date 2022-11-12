import self from '../../models/user.model.js'
import UtilFunctions from "../../util/UtilFunctions.js"
import HttpStatus from "../../util/HttpStatus.js"
import EmailModel from "../../models/email.model.js"
import ResponseCodes from "../../util/ResponseCodes.js";

/**
 * Class represents services.
 */
class UserService {

    static async create(data, rs) {
        let current_user = await self.get(data.email)
        if (current_user)
            throw new ShowOutError("Account already exists. Please login", ResponseCodes.ALREADY_EXISTS, HttpStatus.CONFLICT)
        else {

            // create
            let created_user = await self.create({...({id: UtilFunctions.genId()}), ...(data)})

            if (created_user) {

                //generate mail token
                const email_token = 123456  //UtilFunctions.genOTP()
                console.log(`Token generated: ${email_token}`)

                await self.createVerification(created_user.id, email_token)

                //send verification mail
                // await EmailModel.sendVerificationMail(created_user.id, created_user.full_name, email_token)
                return created_user
            } else {
                UtilFunctions.outputError(rs, 'An error occurred', {}, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }

    static async update(data, rs, user) {
        const updated_user = await self.update(user.id, data)
        if (updated_user) {
            delete updated_user[0].password
            return updated_user[0];
        }
        return []
    }

    static async get(rq, user) {
        return self.get(user.id, false)
    }

    static async list() {
        return self.getMultiple()
    }
}

export default UserService
