import { Router } from 'express';
import swagger from '../public/docs.js';
const router = Router();

swagger(router)
export default router;
