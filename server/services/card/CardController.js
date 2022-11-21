import CardService from './CardService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents card controller.
 */
class CardController {

    static async create (rq, rs) {
        const {owner_id, owner_has_rights_to_upload, on_other_platforms, card_title} = rq.body;
        if (!(owner_id && owner_has_rights_to_upload && on_other_platforms && card_title))
            return UtilFunctions.outputError(rs, "One or more of [owner_id, owner_has_rights_to_upload, on_other_platforms, card_title] are missing")

        const {artist_info, production_info, playlist_request, card_genre} = rq.body;
        if (!(artist_info && production_info && playlist_request && card_genre))
            return UtilFunctions.outputError(rs, "One or more of [artist_info, production_info, playlist_request, card_genre] are missing");

        try {
            const data = await CardService.create(rq, rs, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to create card . Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

}
export default CardController;
