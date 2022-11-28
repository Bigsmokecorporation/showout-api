import CardService from './CardService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents card controller.
 */
class CardController {

    static async create (rq, rs) {
        // const {owner_id, owner_has_rights_to_upload, on_other_platforms, card_title} = rq.body;
        // if (!(owner_id && owner_has_rights_to_upload && on_other_platforms && card_title))
        //     return UtilFunctions.outputError(rs, "One or more of [owner_id, owner_has_rights_to_upload, on_other_platforms, card_title] are missing")
        //
        // const {artist_info, production_info, playlist_request, card_genre_id} = rq.body;
        // if (!(artist_info && production_info && playlist_request && card_genre_id))
        //     return UtilFunctions.outputError(rs, "One or more of [artist_info, production_info, playlist_request, card_genre_id] are missing");
        console.log('CARD_BODY')
        console.log(rq.body)

        const {card_genre_id} = rq.body;
        if (!(card_genre_id))
            return UtilFunctions.outputError(rs, "One or more of [owner_id, card_genre_id] are missing");

        try {
            const data = await CardService.create(rq, rs, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to create card . Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async get(rq, rs) {
        try {
            const data = await CardService.get(rq.params.id);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get card details. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async update(rq, rs) {
        if (!rq.params.id)
            return UtilFunctions.outputError(rs, "No card id specified");
        try {
            const data = await CardService.update(rq.params.id, rq.body);
            UtilFunctions.outputSuccess(rs, data)
        } catch (error) {
            WRITE.error(`Failed to update card. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }

    }

    static async genres (rq, rs) {
        try {
            const data = await CardService.genres(rq, rs, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to create card . Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async list(rq, rs) {
        try {
            const data = await CardService.list(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

}
export default CardController;
