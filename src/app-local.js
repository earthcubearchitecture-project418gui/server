const fs = require('fs');

const { validateLocalExample } = require('./validateJSON');

validateLocalExampleOutputResult('output.json');
return;

/**
 * @param {string} fileName
 */
function validateLocalExampleOutputResult(outputFile) {
  let result = validateLocalExample();

  try {
    result = JSON.stringify(result);
  } catch (e) {
    console.log(" [validateLocalExampleOutputResult] JSON.stringify error : ", e);
    return;
  }

  fs.writeFileSync(outputFile, result);
}