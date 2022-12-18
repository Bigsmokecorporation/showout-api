import { Router } from 'express'
import ListingsController from "../services/card-listings/ListingsController.js"
import {Auth} from "../middleware/auth.js";
const cardListingRoutes = Router()

cardListingRoutes.post("/create", Auth, ListingsController.create)
cardListingRoutes.get("/market", Auth, ListingsController.getMarketListings)
cardListingRoutes.get("/:id", Auth, ListingsController.get)
export default cardListingRoutes
