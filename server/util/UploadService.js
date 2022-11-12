import CONSTANTS from '../util/CONSTANTS.js'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    Bucket: CONSTANTS.BUCKET
})

class UploadService {
    static async uploadFile(file, filename) {
        const data = {
            Key: filename,
            Bucket: CONSTANTS.BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        return s3.putObject(data).promise()
    }

    static async getSignedUrl(filename) {
        return s3.getSignedUrl('getObject', {
            Key: filename,
            Bucket: CONSTANTS.BUCKET,
            Expires: 60 * 5
        })
    }
}

export default UploadService
