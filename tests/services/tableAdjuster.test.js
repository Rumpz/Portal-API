const tableAdjuster = require('services').tableAdjuster;

describe('Test function tableAdjuster', () => {
  test('it returns an object formated headers and body vals', async () => {
    const data = [{id: 1, a: 3, b: 2, c: 4}, {id: 2, a: 5, b: 6, c: 7}];
    const response = tableAdjuster(data);
    const expected = {
      header: ['a', 'b', 'c'],
      body: [{id: 1, values: [3, 2, 4]}, {id: 2, values: [5, 6, 7]}]
    };
    expect(response).toEqual(expected);
  });
});
