import dotenv from 'dotenv';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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
app.use(helmet());
app.use(cookieParser());

//  Connection
const connectToDB = () => {
    DB = knex({
        client: 'pg',
        connection: {
            host : process.env.NODE_ENV === 'prod' ? process.env.PGHOST : 'localhost',
            port : 5432,
            user : process.env.NODE_ENV === 'prod' ? process.env.PGUSER : 'kwametwum',
            password : process.env.PGPASSWORD,
            database : process.env.PGDATABASE
        },
        // connection: process.env.CONN,
        searchPath: ['knex', 'public'],
        // pool: {
        //     min: 1,
        //     max: 3,
        //     acquireTimeoutMillis: 30000,
        //     afterCreate: function (conn, done) {
        //         conn.query('SET timezone="UTC";', function (err) {
        //             if (err) {
        //                 done(err, conn);
        //             } else {
        //                 console.log('All good')
        //             }
        //         });
        //     }
        // },
        acquireConnectionTimeout: 10000,
        migrations: {
            tableName: 'migrations'
        }
    });
}
connectToDB();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
const whitelist = ['https://example1.com', 'https://example2.com', undefined];
app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
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

const swaggerSpec = swaggerJsdoc(CONSTANTS.JSDOC_OPTIONS);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));
app.use(httpContext.middleware);


//ROUTING
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;
