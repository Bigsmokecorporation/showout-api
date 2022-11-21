import CONSTANTS from '../util/Constants.js'
import swaggerUi from 'swagger-ui-express';
import AuthDocs from '../services/auth/AuthDocs.js'
import UserDocs from "../services/user/UserDocs.js";
import AdminDocs from "../services/admin/AdminDocs.js";
import CardDocs from "../services/card/CardDocs.js";

let dc = CONSTANTS.DOCS;
dc = AuthDocs(dc);
dc = UserDocs(dc);
dc = AdminDocs(dc);
dc = CardDocs(dc);

export default function (router) {
    router.get('/json', (req, res) => {
        res.json(dc);
    });
    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(dc));
}