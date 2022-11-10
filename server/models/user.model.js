import UtilFunctions from "../util/UtilFunctions.js"
import jwt from "jsonwebtoken"
import bCrypt from 'bcryptjs';

class UserModel {
    static async create(data) {
        data.password = await bCrypt.hash(data.password, 10);
        let new_user = await DB('users')
            .returning('*')
            .insert(data)

        if (new_user.length) {
            new_user[0].token = jwt.sign({user_id: new_user[0].id}, process.env.JWT, {
                algorithm: 'RS256',
                expiresIn: "1h"
            }, (err, token) => console.log(token))
            delete new_user[0].password
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
            if (!retainPassword) delete user[0].password
        }
        return user[0]
    }
    static async getMultiple() {
        return DB.select('id', 'full_name', 'email', 'user_type')
            .from('users')
            .where({is_active: true})
    }

    static async update(id, data) {
        return DB('users')
            .where({id})
            .returning('*')
            .update(data)
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
            .update({verified})
    }
    static async validateVerificationTokenOrOTP(user_id, token) {
        let thisVerification = await UserModel.getVerificationTokenOrOTP(token)
        if (thisVerification && !thisVerification.err) {
            return thisVerification[0].user_id === user_id
        }
        return false
    }
    static async getVerificationTokenOrOTP(token) {
        let thisVerification = await DB('verifications').select('*').where({token})
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