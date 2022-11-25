import HTTPStatus from "./HttpStatus.js";
import ResponseCodes from "./ResponseCodes.js";
import jwt from "jsonwebtoken";
import randToken from "rand-token";

class Utils {

    static outputError(res, message = 'An error occurred', data = {}, responseCode = ResponseCodes.FAILED, statusCode = HTTPStatus.BAD_REQUEST) {
        res.status(statusCode).json({
            status: responseCode,
            data: Utils._clearNulls(data),
            message
        });
    }

    static outputSuccess(res, data = {}, message = 'Completed successfully', statusCode = HTTPStatus.OK) {
        res.status(statusCode).json({
            status: ResponseCodes.SUCCESS,
            data: Utils._clearNulls(data),
            message
        });
    }

    static _clearNulls(data, clearEmptyStrings = false) {
        let fileKeys
        if (_.isArray(data)) {
            data.forEach(d => this._clearNulls(d))
            return data
        } else {
            fileKeys = Object.keys(data)
        }
        fileKeys.forEach((key) => {
            if (data[key] === null || (clearEmptyStrings && data[key] === '')) {
                delete data[key];
            } else {
                if (typeof data[key] === 'object') {
                    data[key] = Utils._clearNulls(data[key]);
                }
            }
        });
        return data
    }

    static now(daysToAdd = 0) {
        const d = new Date();
        let mn = d.getMonth() + 1;
        if (mn.toString().length === 1)
            mn = `0${mn}`;
        let day_ = d.getDate();
        day_ = day_ + +daysToAdd;
        if (day_.toString().length === 1)
            day_ = `0${day_}`;
        return `${d.getFullYear()}-${mn}-${day_}`;
    }

    static genId(length = 20) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < length; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return autoId;
    }

    static genOTP(length = 6) {
        const chars = '0123456789';
        let autoId = '';
        for (let i = 0; i < length; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return autoId;
    }

    static async tokenizeUser(user) {
        user.token = await jwt.sign({id: user.id}, process.env.JWT, {algorithm: 'HS256', expiresIn: '6h'})
        user.refresh_token = randToken.uid(256)
    }

}

export default Utils;