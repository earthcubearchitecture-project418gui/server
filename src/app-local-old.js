const fs = require('fs');

const { validateExample } = require('./validate.js');

validateLocalExampleOutputResult('output.json');
return;

/**
 * @param {string} fileName
 */
function validateLocalExampleOutputResult(outputFile) {
  let result = validateExample();

  try {
    result = JSON.stringify(result);
  } catch (e) {
    console.log(" [validateLocalExampleOutputResult] JSON.stringify error : ", e);
    return;
  }

  if (outputFile) {
    fs.writeFileSync(outputFile, result);
  }
}