export default class ShowOutError extends Error {
    constructor (message, responseCode = 'FAILED', statusCode = 500) {
        super(message);
        this.responseCode = responseCode;
        this.statusCode = statusCode;
    }
}