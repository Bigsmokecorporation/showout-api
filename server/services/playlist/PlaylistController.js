import PlaylistService from './PlaylistService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents playlist controller.
 */
class PlaylistController {

    /**
     * @desc This function requests to join playlist
     * @author Kwame Twum
     * @since 10/12/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async requestToJoin(rq, rs) {
        const {play_list_id, card_id} = rq.body
        if (!play_list_id || !card_id)
            return UtilFunctions.outputError(rs, 'Both play_list_id and card_id are required')

        try {
            const data = await PlaylistService.requestToJoin(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to request playlist access. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    /**
     * @desc This function creates a playlist
     * @author Kwame Twum
     * @since 10/12/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async create(rq, rs) {
        try {
            const data = await PlaylistService.create(rq);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to create playlist. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async get(rq, rs) {
        if (!rq.params.id)
            return UtilFunctions.outputError(rs, 'Id is required')

        try {
            const data = await PlaylistService.get(rq.params.id, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get playlist details. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async list(rq, rs) {
        try {
            const data = await PlaylistService.list(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to get playlists. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

    static async addTracks(rq, rs) {
        const {tracks} = rq.body
        if (!tracks)
            return UtilFunctions.outputError(rs, 'tracks array not found')

        try {
            const data = await PlaylistService.addTracks(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to assign tracks to playlist. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

}

export default PlaylistController;
