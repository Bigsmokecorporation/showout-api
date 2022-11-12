export default class ShowOutError extends Error {
    constructor (message, data = {}, responseCode = 'FAILED', statusCode = 500) {
        super(message);
        this.responseCode = responseCode;
        this.statusCode = statusCode;
        this.data = data;
    }
}