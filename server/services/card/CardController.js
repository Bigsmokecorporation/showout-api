import CardService from './CardService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents card controller.
 */
class CardController {

    static async create (rq, rs) {
        const {owner_has_rights_to_upload, on_other_platforms, card_title} = rq.body;
        if (!(owner_has_rights_to_upload && on_other_platforms && card_title))
            return UtilFunctions.outputError(rs, "One or more of [owner_has_rights_to_upload, on_other_platforms, card_title] are missing")

        const {artist_info, production_info, card_genre_id} = rq.body;
        if (!(artist_info && production_info && card_genre_id))
            return UtilFunctions.outputError(rs, "One or more of [artist_info, production_info, playlist_request, card_genre_id] are missing");

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
            const data = await CardService.get(rq.params.id, rs.locals.user);
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

    static async random(rq, rs) {
        try {
            const data = await CardService.listRandom(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async search(rq, rs) {
        try {
            const data = await CardService.search(rq.query.keyword, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async popularCards(rq, rs) {
        try {
            const data = await CardService.popularCards(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get popular cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async trendingCards(rq, rs) {
        try {
            const data = await CardService.trendingCards(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get trending cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async playedCards(rq, rs) {
        try {
            const data = await CardService.playedCards(rq.params, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get played cards. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async likeCard(rq, rs) {
        try {
            await CardService.likeCard(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs);
        } catch (error) {
            WRITE.error(`Failed to like card. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async disLikeCard(rq, rs) {
        try {
            await CardService.disLikeCard(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs);
        } catch (error) {
            WRITE.error(`Failed to dislike card. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async favoriteCard(rq, rs) {
        try {
            await CardService.favoriteCard(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs);
        } catch (error) {
            WRITE.error(`Failed to favorite card. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async unFavoriteCard(rq, rs) {
        try {
            await CardService.unFavoriteCard(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs);
        } catch (error) {
            WRITE.error(`Failed to un-favorite card. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async recordCardPlay(rq, rs) {
        try {
            await CardService.recordCardPlay(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs);
        } catch (error) {
            WRITE.error(`Failed to record card playback. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

}
export default CardController;
