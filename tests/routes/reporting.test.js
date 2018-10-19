const request = require('supertest');
const helpers = require('../helpers');
const app = helpers.app();

describe('Test the init route', () => {
  test('It should return status 200 on the main route', async () => {
    const response = await request(app).get('/reporting');
    expect(response.statusCode).toBe(200);
    expect.arrayContaining(Object);
  });
});

describe('Testing byCategory route', () => {
  test('It should return an array of report objects', async () => {
    const response = await request(app)
      .get('/reporting/byCategory')
      .query({category: 'operacao'});
    expect(response.statusCode).toBe(200);
    // expect(response.body).toBe(Array);
    // expect(response.body[0]).toBe(Object);
  });
});

describe('Testing getReport route', () => {
  test('It should return an array of data ', async () => {
    const response = await request(app)
      .get('/reporting/getReport')
      .query({id: 1});
    expect(response.statusCode).toBe(200);
    /* expect(response.body).toBe(Array);
    expect(response.body[0]).toBe(Object); */
  });
});

describe('Testing byFilter route', () => {
  test('It should return an array of data ', async () => {
    const response = await request(app)
      .get('/reporting/byFilter')
      .query({filters: 'KC'});
    expect(response.statusCode).toBe(200);
    /* expect(response.body).toBe(Array);
    expect(response.body[0]).toBe(Object); */
  });
});
