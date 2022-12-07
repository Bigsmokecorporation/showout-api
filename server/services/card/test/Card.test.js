import chai from 'chai'
import chaiHttp from 'chai-http'
const expect = chai.expect
const assert = chai.assert
import request from 'supertest'
chai.use(chaiHttp)
import jwt from 'jsonwebtoken'

// User info
const requestPayload = {
    token: jwt.sign(
        {id: 'fc4y04sK9OiFjcbFZKB1'},
        process.env.JWT,
        {algorithm: 'HS256', expiresIn: '6h'}
    )
}

describe('Card Tests', () => {
    try {
        it('Should be able to list cards', async () => {
            const rs = await request(process.env.BASE_URL)
                .get('/card/list')
                .set({
                    Authorization: `Bearer ${requestPayload.token}`,
                    'x-api-key': process.env.API_KEY,
                })
            expect(rs.body.status).to.be.status
            assert.equal(rs.body.status, 'SUCCESS')
            assert.equal(rs.statusCode, 200)
        })

        it('Should be able to list random cards', async () => {
            const rs = await request(process.env.BASE_URL)
                .get('/card/random')
                .set({
                    Authorization: `Bearer ${requestPayload.token}`,
                    'x-api-key': process.env.API_KEY,
                })
            expect(rs.body.status).to.be.status
            assert.equal(rs.body.status, 'SUCCESS')
            assert.equal(rs.statusCode, 200)
        })

        it('Should be able to search cards', async () => {
            const rs = await request(process.env.BASE_URL)
                .get('/card/search?keyword=')
                .set({
                    Authorization: `Bearer ${requestPayload.token}`,
                    'x-api-key': process.env.API_KEY,
                })
            expect(rs.body.status).to.be.status
            assert.equal(rs.body.status, 'SUCCESS')
            assert.equal(rs.statusCode, 200)
        })

    } catch (exception) {
        WRITE.error(`Getting error while . Error stack: ${exception.stack}`)
    }
})

