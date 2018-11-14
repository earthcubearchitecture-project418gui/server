const fs = require('fs');

const { validateExample } = require('./validate.js');

validateLocalExample('output.json');
return;

/**
 * @param {string} fileName
 */
function validateLocalExample(outputFile) {
  let result = validateExample();

  try {
    result = JSON.stringify(result);
  } catch (e) {
    console.log(" [validateLocalExample] JSON.stringify error : ", e);
    return;
  }

  if (outputFile) {
    fs.writeFileSync(outputFile, result);
  }
}