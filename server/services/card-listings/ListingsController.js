import ListingsService from './ListingsService.js';
import UtilFunctions from "../../util/UtilFunctions.js";

/**
 * Class represents card-listings controller.
 */
class ListingsController {

    /**
     * @desc This function creates a new listing
     * @author Kwame Twum
     * @since 18/12/2022
     * @param {Object} rq Request
     * @param {Object} rs Response
     */
    static async create (rq, rs) {
        const listingType = rq.body.listing_type
        const {card_value, auction_minimum_sale_value, auction_start_price, auction_duration_days} = rq.body

        if (!(auction_minimum_sale_value && auction_start_price && auction_duration_days) && listingType === CONSTANTS.LISTING_TYPES.AUCTION)
            return UtilFunctions.outputError(rs, "One or more of [auction_minimum_sale_value, auction_start_price, auction_duration_days] are missing")

        if (!card_value && listingType === CONSTANTS.LISTING_TYPES.GENERAL)
            return UtilFunctions.outputError(rs, "card_value is missing")

        try {
            const data = await ListingsService.create(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to create listing. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }
    static async get (rq, rs) {
        try {
            const data = await ListingsService.get(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to retrieve listing. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }
    static async getMarketListings (rq, rs) {
        try {
            const data = await ListingsService.getMarketListings(rq, rs.locals.user);
            UtilFunctions.outputSuccess(rs, data);
        } catch (error) {
            WRITE.error(`Failed to retrieve listing. Error stack: ${error.stack}`);
            UtilFunctions.outputError(rs, error.message);
        }
    }

}
export default ListingsController;
