import self from '../../models/user.model.js'
import UtilFunctions from "../../util/UtilFunctions.js"
import HttpStatus from "../../util/HttpStatus.js"
import EmailModel from "../../models/email.model.js"
import ResponseCodes from "../../util/ResponseCodes.js";
import UploadService from "../../util/UploadService.js";

/**
 * Class represents services.
 */
class UserService {

    static async create(data, rs) {
        let current_user = await self.get(data.email)
        if (current_user)
            throw new ShowOutError("Account already exists. Please login", {}, ResponseCodes.ALREADY_EXISTS, HttpStatus.CONFLICT)
        else {

            // create
            let created_user = await self.create({...({id: UtilFunctions.genId()}), ...(data)})

            if (created_user) {

                //generate mail token
                const email_token = 1234  //UtilFunctions.genOTP(4)
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

    static async update(req, rs, user) {
        const data = req.body
        if (!_.isEmpty(req.files)) {
            if (_.has(req.files, 'photo')) {
                const fileName = `photos/${user.id}`;
                await UploadService.uploadFile(req.files.photo[0], fileName);
                data.photo_url = `${CONSTANTS.S3}${fileName}`;
            }
        }
        const updated_user = await self.update(user.id, data)
        if (updated_user) {
            if (updated_user.photo_url)
                updated_user.photo_url = await UploadService.getSignedUrl(`photos/${user.id}`)
            delete updated_user.password
            delete updated_user.pass_code
            return updated_user;
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
