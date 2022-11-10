import HTTPStatus from "./HttpStatus.js";

class Utils {

    static outputError(res, message = 'An error occurred', statusCode = HTTPStatus.BAD_REQUEST) {
        res.status(statusCode).json({
            status: 0,
            data: {},
            message
        });
    }

    static outputSuccess(res, data = {}, message = 'Completed successfully', statusCode = HTTPStatus.OK) {
        res.status(statusCode).json({
            status: 1,
            data: Utils._clearNulls(data),
            message
        });
    }

    static _clearNulls (data) {
        let fileKeys = Array.isArray(data) ? data : Object.keys(data);
        fileKeys.forEach((key) => {
            if (data[key] === null) {
                delete data[key];
            } else {
                if (typeof data[key] === 'object') {
                    data[key] = Utils._clearNulls(data[key]);
                }
            }
        });
        return data;
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

}
export default Utils;