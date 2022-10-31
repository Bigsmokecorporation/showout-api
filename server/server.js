import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

const app = express();
import authRoutes from './routes/authRoutes.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// Global Variables
import WRITE from './util/Logger.js';
import CONSTANTS from './util/Constants.js';
import MOMENT from 'moment';
import _ from 'lodash';
import ShowOutError from "./util/ShowOutError";

global.WRITE = WRITE;
global.CONSTANTS = CONSTANTS;
global.MOMENT = MOMENT;
global._ = _;
global.ShowOutError = ShowOutError;


app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

const whitelist = ['https://example1.com', 'https://example2.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by SHOW OUT CORS'))
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

app.use(httpContext.middleware);


app.use('/auth', authRoutes);


export default app;
