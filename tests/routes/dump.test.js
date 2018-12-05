const request = require('supertest');
const helpers = require('../helpers');
const app = helpers.app();

describe('Test route dumper-columns By ID', () => {
  test('It should return status 200 on the main route', async () => {
    const response =
      await request(app)
        .get('/dump/columns/columnsByID')
        .query({id: 1});
    expect(response.statusCode).toBe(200);
  });
});
