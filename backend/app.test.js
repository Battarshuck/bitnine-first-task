const app = require('./index_test.js');
const request = require('supertest');

describe("Testing the Test path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/test").send({ test: 'test' });
        expect(response.statusCode).toBe(200);
    });
});