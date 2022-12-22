import CardModel from "./card.model.js";

class ListingModel {
    static async create(data, user) {
        let new_listing = await DB('listings')
            .returning('*')
            .insert(data)

        if (new_listing.length)
            return ListingModel.get(new_listing[0].id, user)
        return false
    }

    static async get(id, user) {
        let listings = await DB.select(['listings.*',
            'genres.genre', 'users.stage_name'])
            .from('listings')
            .leftJoin('cards', 'listings.card_id', '=', 'cards.id')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .leftJoin('users', 'cards.owner_id', '=', 'users.id')
            .where({'listings.id': id})
        if (listings.length) {
            const listing = listings[0]
            listing.card = await CardModel.get(listing.card_id, user)
            return listing
        }
        return {}
    }

    static async getMultiple(where = {}, whereNot = {}, whereIn = [], user = {}, limit = 500) {
        let default_query = DB.select(['listings.*',
            'genres.genre', 'users.stage_name'])
            .from('listings')
            .leftJoin('cards', 'listings.card_id', '=', 'cards.id')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .leftJoin('users', 'cards.owner_id', '=', 'users.id')
            .where(where)
            .whereNot(whereNot)
            .limit(limit)

        if (Object.keys(whereIn).length)
            default_query.whereIn(whereIn[0], whereIn[1])

        const listings = await default_query

        for (const listing of listings) {
            listing.card = await CardModel.get(listing.card_id, user)
        }

        return listings
    }

}

export default ListingModel