import UtilFunctions from "../util/UtilFunctions.js";
import HttpStatus from "../util/HttpStatus.js";
import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken";

export default (rq, rs, next) => {
    const token = rq.headers['authorization']
    if (!token)
        return UtilFunctions.outputError(rs, 'An authorization token is required for authentication', HttpStatus.UNAUTHORIZED)

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
            return UtilFunctions.outputError(rs, 'An authorization token is required for authentication', HttpStatus.UNAUTHORIZED)
    })
}
