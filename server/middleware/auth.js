import UtilFunctions from "../util/UtilFunctions.js";
import HttpStatus from "../util/HttpStatus.js";
import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import ResponseCodes from "../util/ResponseCodes.js";

export default (rq, rs, next) => {
    const token = rq.headers['authorization']
    const key = rq.headers['x-api-key']
    if (!token || key !== process.env.API_KEY)
        return UtilFunctions.outputError(rs, 'Authorization token and API key are required for authentication', ResponseCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)

    jwt.verify(token.toString().substring(6).trim(), process.env.JWT, async (err, tokenData) => {
        if (!err) {
            const account = await UserModel.get(tokenData.id)
            if (account)
                rs.locals.user = account
            else
                return UtilFunctions.outputError(rs, 'An authorization token is required for authentication', HttpStatus.UNAUTHORIZED)
            console.log('authenticated')
            return next()
        } else
            return UtilFunctions.outputError(rs, 'The authorization token is invalid', ResponseCodes.INVALID_TOKEN, HttpStatus.UNAUTHORIZED)
    })
}
