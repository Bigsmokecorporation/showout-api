import UtilFunctions from "../../util/UtilFunctions.js"
import UploadService from "../../util/UploadService.js"
import responseCodes from "../../util/ResponseCodes.js"
import HttpStatus from "../../util/HttpStatus.js"
import CardModel from "../../models/card.model.js"

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

        if (user.client === 'mobile')
            return CardService.createWithB64Files(rq, rs, user)
        else
            return CardService.createWithMultipart(rq, rs, user)
    }

    static async createWithB64Files(rq, rs, user) {
        const id = UtilFunctions.genId()
        const data = {id, ...rq.body, ...{owner_id: user.id}}

        if (data.media && data.media_demo) {
            console.log('1 down')
            const file_name = `media/raw/${id}.mp3`
            const buffer = Buffer.from(data.media.replace(/^data:audio\/\w+;base64,/, ""), 'base64')
            await UploadService.uploadFileInB64(buffer, file_name, 'audio/mpeg')
            data.media_url = `${CONSTANTS.S3}${file_name}`

            console.log('2 down')
            const demo_file_name = `media/crop/${id}.mp3`
            const buffer2 = Buffer.from(data.media_demo, 'base64')
            await UploadService.uploadFileInB64(buffer2, demo_file_name, 'audio/mpeg')
            data.media_demo_url = `${CONSTANTS.S3}${demo_file_name}`

            console.log('3 down')
            const x = `media/cover/${id}.jpg`
            const bufferx = Buffer.from(data.cover_art.replace(/^data:image\/\w+;base64,/, ""), 'base64')
            await UploadService.uploadFileInB64(bufferx, x, 'image/jpeg')
            data.cover_art_url = `${CONSTANTS.S3}${x}`

            delete data.media
            delete data.media_demo
            delete data.cover_art

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
                return UtilFunctions.outputError(rs, 'An error occurred', {}, HttpStatus.INTERNAL_SERVER_ERROR)

        } else {
            throw new ShowOutError('No files found. Please select media files', {}, responseCodes.NO_FILES_FOUND, HttpStatus.BAD_REQUEST)
        }

    }

    static async createWithMultipart(rq, rs, user) {
        const id = UtilFunctions.genId()
        const data = {id, ...rq.body, ...{owner_id: user.id}}

        if (!_.isEmpty(rq.files)) {
            if (_.has(rq.files, 'media')) {
                const fileName = `media/raw/${id}.mp3`
                await UploadService.uploadFile(rq.files.media[0], fileName)
                data.media_url = `${CONSTANTS.S3}${fileName}`
            }
            if (_.has(rq.files, 'cover_art')) {
                const fileName = `media/cover/${id}.jpg`
                await UploadService.uploadFile(rq.files.cover_art[0], fileName)
                data.cover_art_url = `${CONSTANTS.S3}${fileName}`
            }
            if (_.has(rq.files, 'media_demo')) {
                const fileName = `media/crop/${id}.mp3`
                await UploadService.uploadFile(rq.files.media_demo[0], fileName)
                data.media_demo_url = `${CONSTANTS.S3}${fileName}`
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
                return UtilFunctions.outputError(rs, 'An error occurred', {}, HttpStatus.INTERNAL_SERVER_ERROR)

        } else {
            throw new ShowOutError('No files found. Please select media files', {}, responseCodes.NO_FILES_FOUND, HttpStatus.BAD_REQUEST)
        }
    }

    static async update(rq, data) {
        const id = rq.params.id
        const updated_card = await CardModel.update(id, data)
        if (updated_card)
            return updated_card
        throw new ShowOutError('Update failed')
    }

    static async get(id, user) {
        return CardModel.get(id, user)
    }

    static async list(rq, user) {
        return CardModel.getMultiple(rq.query, {}, user)
    }

    static async listRandom(rq, user) {
        return CardModel.getMultiple({}, {
            'owner_id': user.id
        }, user)
    }

    static async search(keyword, user) {
        return CardModel.search(keyword, user)
    }

    static async popular(rq, user) {
        return CardModel.popular(keyword, user)
    }

    static async genres() {
        let genres = await DB.select('*')
            .from('genres')
        return genres ?? []
    }


    //  ACTIONS

    static async likeCard(card_id, user) {
        await DB('likes')
            .returning('*')
            .insert({
                id: UtilFunctions.genId(),
                user_id: user.id,
                card_id,
            })
    }

    static async disLikeCard(card_id, user) {
        await DB('likes')
            .where({user_id: user.id, card_id})
            .del()
    }

    static async favoriteCard(card_id, user) {
        await DB('favorites')
            .returning('*')
            .insert({
                id: UtilFunctions.genId(),
                user_id: user.id,
                card_id,
            })
    }

    static async unFavoriteCard(card_id, user) {
        await DB('favorites')
            .where({user_id: user.id, card_id})
            .del()
    }

    static async recordCardPlay(card_id, user) {

        await DB('plays')
            .returning('*')
            .insert({
                id: UtilFunctions.genId(),
                user_id: user.id,
                card_id,
            })
    }
}

export default CardService
