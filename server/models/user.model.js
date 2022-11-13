import UtilFunctions from "../util/UtilFunctions.js"
import bCrypt from 'bcryptjs';
import UploadService from "../util/UploadService.js";

class UserModel {
    static async create(data) {
        if (data.password) data.password = await bCrypt.hash(data.password, 10);
        let new_user = await DB('users')
            .returning('*')
            .insert(data)

        if (new_user.length) {
            await UtilFunctions.tokenizeUser(new_user[0])
            await UserModel.update(new_user[0].id, {refresh_token: new_user[0].refresh_token})
            delete new_user[0].password
            delete new_user[0].pass_code
            return new_user[0]
        }
        return false
    }

    static async get(parameter, retainPassword = false) {
        let user = await DB.select('*')
            .from('users')
            .where({id: parameter})
            .orWhere({email: parameter})
        if (user.length) {
            if (user[0].photo_url && !user[0].is_social_login)
                user[0].photo_url = await UploadService.getSignedUrl(`photos/${user[0].id}`)
            if (!retainPassword) delete user[0].password
            delete user[0].pass_code
        }
        return user[0]
    }
    static async getMultiple() {
        return DB.select('id', 'full_name', 'email', 'user_type')
            .from('users')
            .where({is_active: true})
    }

    static async update(parameter, data, returning = '*') {
        const user = await DB('users')
            .where({id: parameter})
            .orWhere({email: parameter})
            .returning(returning)
            .update(data)
        if (user.length) {
            if (user[0].photo_url && !user[0].is_social_login)
                user[0].photo_url = await UploadService.getSignedUrl(`photos/${user[0].id}`)
            delete user[0].password
            delete user[0].pass_code
            return user[0];
        }
        return false;
    }


    static async createVerification(user_id, token, type = 'email') {
        await UserModel.clearVerification(user_id)
        const newVerification = await DB('verifications')
            .returning('id')
            .insert({
                id: UtilFunctions.genId(),
                user_id,
                verification_type: type,
                token: token
            })
        return !newVerification.err
    }
    static async pendingVerification(user_id) {
        return DB.select('*')
            .from('verifications')
            .where({user_id, status: 'pending'})
    }
    static async hasPendingVerification(user_id) {
        const pv = await this.pendingVerification(user_id)
        return pv.length
    }
    static async updateVerificationStatus(user_id, verified = false) {
        return DB('verifications')
            .where({user_id})
            .update({verified, status: 'completed'})
    }
    static async validateVerificationToken(user_id, token) {
        let thisVerification = await UserModel.getVerificationToken(token)
        if (thisVerification && !thisVerification.err) {
            return thisVerification.user_id === user_id
        }
        return false
    }
    static async getVerificationToken(token) {
        let thisVerification = await DB('verifications').select('*').where({token, status: 'pending'})
        if (thisVerification && !thisVerification.err) {
            return thisVerification[0]
        }
        return false
    }
    static async clearVerification(user_id) {
        return DB('verifications')
            .where({user_id})
            .del()
    }
}

export default UserModel