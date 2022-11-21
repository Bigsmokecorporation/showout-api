import UtilFunctions from "../util/UtilFunctions.js"

class CardModel {
    static async create(data) {
        let new_card = await DB('cards')
            .returning('*')
            .insert(data)
        return new_card.length ? new_card[0] : false

    }
}

export default CardModel