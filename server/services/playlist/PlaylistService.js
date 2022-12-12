import UtilFunctions from "../../util/UtilFunctions.js";
import PlaylistModel from "../../models/playlist.model.js";

/**
 * Class represents playlist services.
 */
class PlaylistService {

    /**
     * @desc This function requests to join playlist
     * @author Kwame Twum
     * @since 10/12/2022
     * @param {Object} rq Request
     * @param {Object} user
     */
    static async requestToJoin (rq, user) {
        const data = rq.body
        data.id = UtilFunctions.genId()
        return PlaylistModel.createTrack(data)
    }

    static async get(id, user) {
        return PlaylistModel.get(id, user)
    }

    static async list(rq, user) {
        return PlaylistModel.getMultiple(rq.query, {}, user)
    }

    static async create (rq) {
        const data = rq.body
        data.approved = false
        const new_playlist = await PlaylistModel.create(data)

        if (!new_playlist)
            throw new ShowOutError('An error occurred while creating the playlist')
        return new_playlist
    }

    static async addTracks (rq) {
        const playlist_id = rq.params.id
        const track_list = rq.body.tracks

        for (const track of track_list) {
            await PlaylistModel.createTrack({
                id: UtilFunctions.genId(),
                playlist_id,
                card_id: track.card_id,
                approved: true,
                approved_at: UtilFunctions.now()
            })
        }
    }
}

export default PlaylistService;
