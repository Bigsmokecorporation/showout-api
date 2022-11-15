import bCrypt from "bcryptjs";
import UtilFunctions from "../util/UtilFunctions.js";

class AdminModel {

    static async create(data) {
        if (data.password) data.password = await bCrypt.hash(data.password, 10);
        let new_admin = await DB('admins')
            .returning('*')
            .insert(data)

        if (new_admin.length) {
            await UtilFunctions.tokenizeUser(new_admin[0])
            await AdminModel.update(new_admin[0].id, {refresh_token: new_admin[0].refresh_token})
            delete new_admin[0].password
            return new_admin[0]
        }
        return false
    }

    static async get(parameter, retainPassword = false) {
        let admin = await DB.select('*')
            .from('admins')
            .where({id: parameter})
            .orWhere({email: parameter})
        if (admin.length) {
            if (!retainPassword) delete admin[0].password
        }
        return admin[0]
    }
    
    static async getMultiple() {
        return DB.select('id', 'full_name', 'email', 'role_id', 'admin_type')
            .from('admins')
            .where({is_active: true})
    }

    static async update(parameter, data, returning = '*') {
        const admin = await DB('admins')
            .where({id: parameter})
            .orWhere({email: parameter})
            .returning(returning)
            .update(data)
        if (admin.length) {
            delete admin[0].password
            return admin[0];
        }
        return false;
    }
}

export default AdminModel