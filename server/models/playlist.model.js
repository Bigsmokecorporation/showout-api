class PlaylistModel {

    static async create(data) {
        let new_list = await DB('playlists')
            .returning('*')
            .insert(data)

        return new_list.length ? new_list[0] : false
    }

    static async get(id) {
        let playlists = await DB('playlists')
            .where({id})

        if (playlists.length) {
            const playlist = playlists[0]
            await this.populateTracks(playlist)
            return playlist
        }

        return {}
    }

    static async getMultiple(where) {
        let playlists = await DB('playlists')
            .where(where)

        for (const playlist of playlists) {
            await this.populateTracks(playlist)
        }

        return playlists
    }

    static async createTrack(data) {
        let new_list = await DB('tracks')
            .returning('*')
            .insert(data)

        return new_list.length ? new_list[0] : false
    }

    static async populateTracks(playlist_id, approved = true) {
        return DB('tracks')
            .where({
                playlist_id,
                approved
            })
    }

    static async update(id, data, returning = '*') {
        return DB('playlists')
            .where({id})
            .returning(returning)
            .update(data)
    }
}

export default PlaylistModel