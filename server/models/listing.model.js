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
            'cards.card_title','cards.media_url','cards.media_demo_url','cards.cover_art_url',
            'genres.genre', 'users.stage_name'])
            .from('listings')
            .leftJoin('cards', 'listings.card_id', '=', 'cards.id')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .leftJoin('users', 'cards.owner_id', '=', 'users.id')
            .where({'listings.id': id})
        if (listings.length) {
            const card = listings[0]
            await CardModel.populateCardDetails(card, user)
            return card
        }
        return {}
    }

    static async getMultiple(where = {}, whereNot = {}, whereIn = [], user = {}, limit = 500) {
        let default_query = DB.select(['listings.*',
            'cards.card_title','cards.media_url','cards.media_demo_url','cards.cover_art_url',
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

        const cards = await default_query

        for (const card of cards) {
            await CardModel.populateCardDetails(card, user)
        }

        return cards
    }

}

export default ListingModel