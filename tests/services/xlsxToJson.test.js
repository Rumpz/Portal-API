const xlsxToJson = require('services').xlsxToJson;

describe('Test function xlsxToHTML ', () => {
  test('it should parse a xlsx file into Json', async () => {
    const response = await xlsxToJson('test');
    expect(response).toBeInstanceOf(Object);
    expect.arrayContaining(response);
  });
});
