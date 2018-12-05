const request = require('supertest');
const helpers = require('../helpers');
const app = helpers.app();

describe('Test the init route', () => {
  test('It should return status 200 on the main route', async () => {
    const response = await request(app).get('/mainpage');
    expect(response.statusCode).toBe(200);
    expect.arrayContaining(Object);
  });
});
