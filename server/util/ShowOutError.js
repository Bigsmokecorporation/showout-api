export default class ShowOutError extends Error {
    constructor (message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}