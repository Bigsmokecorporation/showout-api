import CardModel from "./card.model.js";

class PlaylistModel {

    static async create(data) {
        let new_list = await DB('playlists')
            .returning('*')
            .insert(data)

        return new_list.length ? new_list[0] : false
    }

    static async get(id, user) {
        let playlists = await DB.select('*')
            .from('playlists')
            .where({id})

        if (playlists.length) {
            const playlist = playlists[0]
            await this.populateTracks(playlist, user)
            return playlist
        }

        return {}
    }

    static async getMultiple(where, user) {
        let playlists = await DB.select('*')
            .from('playlists')
            .where(where)

        for (const playlist of playlists) {
            await this.populateTracks(playlist, user)
        }

        return playlists
    }

    static async createTrack(data) {
        let new_list = await DB('tracks')
            .returning('*')
            .insert(data)

        return new_list.length ? new_list[0] : false
    }

    static async populateTracks(playlist, user, approved = true) {
        const cards = await DB.select('card_id')
            .from('tracks')
            .where({
                playlist_id: playlist.id,
                approved
            })

        if (cards.length) {
            const card_ids = cards.map(c => c.card_id)
            const card_details = await CardModel.getMultiple({}, {}, ['cards.id', card_ids], user)

            if (card_details) {
                for (const c of card_details)
                    await CardModel.populateCardDetails(c)
                playlist.track_list = card_details
            }
        }
    }

    static async update(id, data, returning = '*') {
        return DB('playlists')
            .where({id})
            .returning(returning)
            .update(data)
    }
}

export default PlaylistModel