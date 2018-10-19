const excelFinder = require('services').excelFinder;

describe('Test function file Finder', () => {
  test('it should return a file by path name', async () => {
    const response = await excelFinder('test');
    expect(response).toBeInstanceOf(Buffer);
  });
});
