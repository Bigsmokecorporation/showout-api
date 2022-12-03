import UploadService from "../util/UploadService.js"

class CardModel {
    static async create(data) {
        let new_card = await DB('cards')
            .returning('*')
            .insert(data)

        if (new_card.length)
            return get(new_card[0].id)
        return false
    }

    static async get(id) {
        let cards = await DB.select(['cards.*', 'genres.genre'])
            .from('cards')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .where({'cards.id': id})
        if (cards.length) {
            const card = cards[0]
            await this.populateCardDetails(card)
            return card
        }
        return {}
    }

    static async getMultiple(where = {}, whereNot = {}) {
        let default_query = await DB.select(['cards.*', 'genres.genre'])
            .from('cards')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .where(where)
            .whereNot(whereNot)

        const cards = await default_query
        for (const card of cards) {
            await this.populateCardDetails(card)
        }

        return cards
    }

    static async search(keyword) {
        let cards = await DB.select(['cards.*', 'genres.genre'])
            .from('cards')
            .leftJoin('genres', 'cards.card_genre_id', '=', 'genres.id')
            .where('is_active', true)
            .andWhere(function () {
                this.whereILike('card_title', `%${keyword}%`)
                    .orWhereILike('artist_info', `%${keyword}%`)
                    .orWhereILike('production_info', `%${keyword}%`)
                    .orWhereILike('lyrics', `%${keyword}%`)
            })

        for (const card of cards) {
            await this.populateCardDetails(card)
        }

        return cards
    }

    static async populateCardDetails(card) {
        delete card.is_active
        if (card.media_url)
            card.media_url = await UploadService.getSignedUrl(`media/raw/${card.id}`)
        if (card.media_demo_url)
            card.media_demo_url = await UploadService.getSignedUrl(`media/crop/${card.id}`)
        if (card.cover_art_url)
            card.cover_art_url = await UploadService.getSignedUrl(`media/cover/${card.id}`)
    }

    static async update(id, data, returning = '*') {
        const card = await DB('cards')
            .where({id})
            .returning(returning)
            .update(data)
        if (card.length) {
            return this.get(id)
        }
        return false
    }
}

export default CardModel