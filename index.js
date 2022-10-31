#!/usr/bin/env node
'use strict';

import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
import app from './server/server.js';
// import cron from 'node-cron';


export default app.listen(process.env.PORT, () => {
    WRITE.info('Server is started at : %s', process.env.PORT);
});
