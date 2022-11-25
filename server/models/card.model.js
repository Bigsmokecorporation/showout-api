import UploadService from "../util/UploadService.js";

class CardModel {
    static async create(data) {
        let new_card = await DB('cards')
            .returning('*')
            .insert(data)
        return new_card.length ? new_card[0] : false
    }

    static async get(id) {
        let cards = await DB.select('*')
            .from('cards')
            .where({id})
        if (cards.length) {
            const card = cards[0]
            if (card.media_url)
                card.media_url = await UploadService.getSignedUrl(`media/raw/${card.id}`)
            if (card.media_demo_url)
                card.media_demo_url = await UploadService.getSignedUrl(`media/crop/${card.id}`)
            if (card.cover_art_url)
                card.cover_art_url = await UploadService.getSignedUrl(`media/cover/${card.id}`)

            return card
        }
        return {}
    }

    static async getMultiple(query) {
        const default_query = DB.select('*')
            .from('cards')
        if (query)
            default_query.where(query)

        const cards = await default_query
        for (const card of cards) {
            if (card.media_url)
                card.media_url = await UploadService.getSignedUrl(`media/raw/${card.id}`)
            if (card.media_demo_url)
                card.media_demo_url = await UploadService.getSignedUrl(`media/crop/${card.id}`)
            if (card.cover_art_url)
                card.cover_art_url = await UploadService.getSignedUrl(`media/cover/${card.id}`)
        }

        return cards
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