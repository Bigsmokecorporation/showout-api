import UtilFunctions from "../util/UtilFunctions.js";
import HttpStatus from "../util/HttpStatus.js";
import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import ResponseCodes from "../util/ResponseCodes.js";
import AdminModel from "../models/admin.model.js";

export function Auth (rq, rs, next) {
    const token = rq.headers['authorization']
    const key = rq.headers['x-api-key']
    const client = rq.headers['x-client'] || 'web'
    if (!token || key !== process.env.API_KEY)
        return UtilFunctions.outputError(rs, 'Authorization token and API key are required for authentication', {}, ResponseCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)

    jwt.verify(token.toString().substring(6).trim(), process.env.JWT, async (err, tokenData) => {
        if (!err) {
            const user_account = await UserModel.get(tokenData.id)
            const admin_account = await AdminModel.get(tokenData.id)

            if (user_account || admin_account) {
                rs.locals.user = {...user_account, ...admin_account, ...{client}}
            } else
                return UtilFunctions.outputError(rs, 'An authorization token is required for authentication', {}, HttpStatus.UNAUTHORIZED)
            return next()
        } else
            return UtilFunctions.outputError(rs, 'The authorization token is invalid', {}, ResponseCodes.INVALID_TOKEN, HttpStatus.UNAUTHORIZED)
    })
}

export function AdminAuth (rq, rs, next) {
    const token = rq.headers['authorization']
    const key = rq.headers['x-api-key']
    const client = rq.headers['x-client'] || 'web'
    if (!token || key !== process.env.API_KEY)
        return UtilFunctions.outputError(rs, 'Authorization token and API key are required for authentication', {}, ResponseCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)

    jwt.verify(token.toString().substring(6).trim(), process.env.JWT, async (err, tokenData) => {
        if (!err) {
            const account = await AdminModel.get(tokenData.id)
            if (account) {
                rs.locals.user = {...account, ...{client}}
            } else
                return UtilFunctions.outputError(rs, 'An authorization token is required for authentication', {}, HttpStatus.UNAUTHORIZED)
            console.log('authenticated')
            return next()
        } else
            return UtilFunctions.outputError(rs, 'The authorization token is invalid', {}, ResponseCodes.INVALID_TOKEN, HttpStatus.UNAUTHORIZED)
    })
}
