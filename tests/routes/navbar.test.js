const request = require('supertest');
const helpers = require('../helpers');
const app = helpers.app();

describe('Test the init route', () => {
  test('It should return status 200 and an array of objects on the navbar route', async () => {
    const response = await request(app).get('/navbar/menus');
    expect(response.statusCode).toBe(200);
    expect.arrayContaining(Object);
  });
});

/* describe('Test the navbar menu elements fetch', () => {
  test('It should return status 200 and an object of options', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Object);
    expect.arrayContaining(Object);
  });
}); */
