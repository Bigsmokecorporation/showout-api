import ShowOutError from "./ShowOutError";
import HTTPStatus from "./HttpStatus";

class Utils {

    static errorResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 0,
                data: {},
                message: ''
            })
        );
    }

    static successResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 1,
                data: {},
                message: ''
            })
        );
    }

    static sendResponse(error, data, res, successMessage, successMessageVars) {
        let responseObject;
        if (error) {
            let status;
            responseObject = Utils.errorResponse();
            if (error instanceof ShowOutError) {
                responseObject.message = error.message;
                status = error.statusCode ? error.statusCode : HTTPStatus.BAD_REQUEST;
                CONSOLE_LOGGER.info(error.message);
            } else {
                responseObject.message = res.__('ERROR_MSG');
                status = HTTPStatus.INTERNAL_SERVER_ERROR;
                CONSOLE_LOGGER.error(error);
            }
            responseObject.data = error.data;
            res.status(status).send(responseObject);
        } else {
            responseObject = Utils.successResponse();
            responseObject.message = successMessageVars
                ? res.__.apply('', [successMessage].concat(successMessageVars))
                : successMessage;
            responseObject.data = data;
            responseObject.newNotification = res.newNotification;
            res.status(HTTPStatus.OK).send(responseObject);
        }
    }
}
export default Utils;