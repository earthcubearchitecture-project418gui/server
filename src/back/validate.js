'use strict';

const fs = require('fs');
const path = require('path');

const { printLine, printLargeObj } = require('../share/funcs.js');
const { isValidDataset } = require('../share/dataset_validation.js');

const JSONLD_EXAMPLES_FOLDER = path.join(__dirname, '..', 'share', 'jsonld_examples', 'datasets');


/**
 * @returns {native JSON} result
 */
function validateExample() {
  const docSrc = fs.readFileSync(path.join(JSONLD_EXAMPLES_FOLDER, 'bcodmo_dataset.json'));
  // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');
  const doc = JSON.parse(docSrc);
  printLine(); //Start line

  const result = isValidDataset(doc);

  printLargeObj(result);

  return result;
}

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

module.exports = {
  validateExample,
  validateLocalExample
};