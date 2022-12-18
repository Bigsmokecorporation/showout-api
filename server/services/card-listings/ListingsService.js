import ListingModel from "../../models/listing.model.js";
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents card-listings services.
 */
class ListingsService {

    /**
     * @desc This function
     * @author Kwame Twum
     * @since 18/12/2022
     * @param {Object} rq Request
     * @param {Object} user
     */
    static async create (rq, user) {
        const data = {...rq.body, ...{
            id: UtilFunctions.genId(),
            ...(rq.body.listing_type === CONSTANTS.LISTING_TYPES.AUCTION && {
                auction_expiry: UtilFunctions.now(rq.body.auction_duration_days)
            })
        }}
        return ListingModel.create(data, user)
    }

    static async get (rq, user) {
        return ListingModel.get(rq.params.id, user)
    }

    static async getMarketListings (rq, user) {
        return ListingModel.getMultiple({}, {}, {}, user)
    }
}

export default ListingsService;
