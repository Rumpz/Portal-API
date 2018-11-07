module.exports = {
  adjustDataToSend: adjustDataToSend
};

function adjustDataToSend (data) {
  return data.map(element => {
    if (element.inputs) {
      element.inputs = element.inputs
        ? element.inputs.split(',')
        : [];
    }
    return element;
  });
}
