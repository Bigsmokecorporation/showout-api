import dotenv from 'dotenv'
const env = process.env.NODE_ENV || 'ci'
dotenv.config({ path: process.env.PWD + '/' + env + '.env' })
import Logger from '../server/util/Logger.js'
import CONSTANTS from '../server/util/Constants.js'
import MOMENT from 'moment'
import _ from 'lodash'
import CodeMonkError from '../server/util/ShowOutError.js'

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
chai.use(chaiHttp)
import request from 'supertest'
request(app)
const assert = chai.assert;

describe('Stop server in end', () => {
    it('Server should stop manually to complete test', done => {
        assert.equal(true, true)
        app.close()
        done()
    })
})