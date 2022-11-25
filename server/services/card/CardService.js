import UtilFunctions from "../../util/UtilFunctions.js";
import UploadService from "../../util/UploadService.js";
import responseCodes from "../../util/ResponseCodes.js";
import httpStatus from "../../util/HttpStatus.js";
import CardModel from "../../models/card.model.js";
import HttpStatus from "../../util/HttpStatus.js";

/**
 * Class represents card services.
 */
class CardService {

    /**
     * @desc This function
     * @author Kwame Twum
     * @since 20/11/2022
     * @param {Object} rq Request
     * @param rs
     * @param {Object} user
     */
    static async create(rq, rs, user) {
        const id = UtilFunctions.genId()
        const data = {id, ...rq.body, ...{owner_id: user.id}}

        if (!_.isEmpty(rq.files)) {
            if (_.has(rq.files, 'media')) {
                const fileName = `media/raw/${id}`;
                await UploadService.uploadFile(rq.files.media[0], fileName);
                data.media_url = `${CONSTANTS.S3}${fileName}`;
            }
            if (_.has(rq.files, 'cover_art')) {
                const fileName = `media/cover/${id}`;
                await UploadService.uploadFile(rq.files.cover_art[0], fileName);
                data.cover_art_url = `${CONSTANTS.S3}${fileName}`;
            }
            if (_.has(rq.files, 'media_demo')) {
                const fileName = `media/crop/${id}`;
                await UploadService.uploadFile(rq.files.media_demo[0], fileName);
                data.media_demo_url = `${CONSTANTS.S3}${fileName}`;
            }

            UtilFunctions._clearNulls(data, true)

            //Parse json fields
            if (data.media_meta)
                data.media_meta = JSON.parse(data.media_meta)
            if (data.style)
                data.style = JSON.parse(data.style)

            let created_card = await CardModel.create(data)

            if (created_card)
                return created_card
            else
                UtilFunctions.outputError(rs, 'An error occurred', {}, HttpStatus.INTERNAL_SERVER_ERROR)

        } else {
            throw new ShowOutError('No files found. Please select media files', {}, responseCodes.NO_FILES_FOUND, httpStatus.BAD_REQUEST)
        }

    }

    static async update(rq, data) {
        const id = rq.params.id
        if (!_.isEmpty(rq.files)) {
            if (_.has(rq.files, 'media')) {
                const fileName = `media/raw/${id}`;
                await UploadService.uploadFile(rq.files.media[0], fileName);
                data.media_url = `${CONSTANTS.S3}${fileName}`;
            }
            if (_.has(rq.files, 'cover_art')) {
                const fileName = `media/cover/${id}`;
                await UploadService.uploadFile(rq.files.cover_art[0], fileName);
                data.cover_art_url = `${CONSTANTS.S3}${fileName}`;
            }
            if (_.has(rq.files, 'media_demo')) {
                const fileName = `media/crop/${id}`;
                await UploadService.uploadFile(rq.files.media_demo[0], fileName);
                data.media_demo_url = `${CONSTANTS.S3}${fileName}`;
            }
        }

        const updated_card = await CardModel.update(id, data)
        if (updated_card)
            return updated_card;
        throw new ShowOutError('Update failed')
    }

    static async get(id) {
        return CardModel.get(id, false)
    }

    static async list(rq) {
        return CardModel.getMultiple(rq.query)
    }

    static async genres() {
        let genres = await DB.select('*')
            .from('genres')
        return genres ?? []
    }
}

export default CardService;
