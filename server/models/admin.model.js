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
        let admin = await DB.select('admins.*')
            .from('admins')
            .where({id: parameter})
            .orWhere({email: parameter})
        if (admin.length) {
            if (!retainPassword) delete admin[0].password
        }
        return admin[0]
    }
    
    static async getMultiple(query) {
        const admins = await DB.select('*')
            .fromRaw('(select admins.*, role_name, can_manage_admins,can_manage_users,can_manage_cards,can_manage_transactions from admins inner join roles r on r.id = admins.role_id) ab')
            // .raw(`select admins.*, role_name from admins inner join roles r on r.id = admins.role_id`)
            // .select('admins.*, roles.*')
            // .from('admins')
            // .leftJoin('roles', 'admins.role_id', 'roles.id')
        // if (query)
        //     default_query.where(query)

        // const admins = await default_query
        for (const admin of admins) {
            delete admin.password
            delete admin.refresh_token
        }

        return admins
    }

    static async update(id, data, returning = '*') {
        const admin = await DB('admins')
            .where({id})
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