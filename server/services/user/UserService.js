import self from '../../models/user.model.js'
import UtilFunctions from "../../util/UtilFunctions.js"
import HttpStatus from "../../util/HttpStatus.js"
import EmailModel from "../../models/email.model.js"
/**
 * Class represents services.
 */
class UserService {

    static async create (data, rs) {
        let current_user = await self.get(data.email)
        if (current_user) {
            const hasPendingVerification = await self.hasPendingVerification(current_user.id)
            if (hasPendingVerification) {
                //resend mail
                const pendingVerification = await self.pendingVerification(current_user.id)
                await EmailModel.sendVerificationMail(current_user.id, current_user.full_name, pendingVerification[0].token)
                return UtilFunctions.outputError(rs, "Account already exists. Please check your mail to continue", HttpStatus.CONFLICT)
            } else
                return UtilFunctions.outputError(rs, "Account already exists. Please login", HttpStatus.CONFLICT)

        } else {

            // create
            let created_user = await self.create({...({id: UtilFunctions.genId()}), ...(data)})

            if (created_user) {

                //generate mail token
                const email_token = UtilFunctions.genOTP()
                console.log(`Token generated: ${email_token}`)

                await self.createVerification(created_user.id, email_token)

                //send verification mail
                await EmailModel.sendVerificationMail(created_user.id, created_user.full_name, email_token)
                return created_user
            } else {
                UtilFunctions.outputError(rs, 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }

    static async update (data, rs, user) {
        await self.save(user.id, data)
    }

    static async get (rs, user) {
        return self.get(user.id, false)
    }

    static async list () {
        return self.getMultiple()
    }
}

export default UserService
