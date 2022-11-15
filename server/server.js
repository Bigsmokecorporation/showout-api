import dotenv from 'dotenv';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();



// Global Variables
import WRITE from './util/Logger.js';
import CONSTANTS from './util/Constants.js';
import MOMENT from 'moment';
import _ from 'lodash';
import ShowOutError from "./util/ShowOutError.js";
import pkg from 'knex';
const { knex } = pkg;

global.DB = knex;
global.WRITE = WRITE;
global.CONSTANTS = CONSTANTS;
global.MOMENT = MOMENT;
global._ = _;
global.ShowOutError = ShowOutError;

app.use(compression());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({
        status: 'ok',
        date: MOMENT(),
        visitor: req.ip,
        version: 1.0
    });
});

//  Connection
const connectToDB = () => {
    DB = knex({
        client: 'pg',
        connection: process.env.CONN,
        searchPath: ['knex', 'public'],
        pool: {
            min: 1,
            max: 3,
            acquireTimeoutMillis: 30000,
        },
        acquireConnectionTimeout: 10000,
        migrations: {
            tableName: 'migrations'
        }
    });
}
connectToDB();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

app.use(httpContext.middleware);

//ROUTING
import docRoutes from './routes/docRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use('/docs', docRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

export default app;
