const app = require('../src');
const { makeUUID } = require('../src/bin/uuid.js');

describe('Express GET /', () => {
    it('should return uuid', (done) => {
        const getUUID = makeUUID()
        request(app).get('/').then((response) => {
            expect(response.text).toBe(getUUID());
            done();
        })
    })
})