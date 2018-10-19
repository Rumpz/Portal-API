/* It receives and array of objects
and returns and object of arrays
divided by headers and body
*/

module.exports = (arr) => {
  // Filter array keys to set aside the ID key
  const keys = Object.keys(arr[0]).filter(e => e !== 'id');
  let body = arr.map((row) => {
    return {
      id: row.id,
      values: keys.map((key) => row[key])
    };
  });
  return {
    header: keys,
    body: body
  };
};
