import AuthDocs from '../services/auth/AuthDocs.js'
import UserDocs from "../services/user/UserDocs.js";
import CONSTANTS from '../util/Constants.js'
import swaggerUi from 'swagger-ui-express';

let dc = CONSTANTS.DOCS;
dc = AuthDocs(dc);
dc = UserDocs(dc);

export default function (router) {
    router.get('/json', (req, res) => {
        res.json(dc);
    });
    router.use('/', swaggerUi.serve);
    router.get('/', swaggerUi.setup(dc));
}