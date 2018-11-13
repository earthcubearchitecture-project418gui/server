'use strict';

const fs = require('fs');
const path = require('path');

const { printLine, printLargeObj } = require('./funcs.js');
const { isValidDataset } = require('./dataset_validation.js');

const JSONLD_EXAMPLES_FOLDER = path.join(__dirname, 'jsonld_examples/');


/**
 * 
 * @param {obj} doc 
 */
function validateDatasetDocument(doc) {
  const result = isValidDataset(doc);
  return result;
}

/**
 * 
 * @param {obj} doc 
 */
function validateOrganizationDocument(doc) {
  return;
}

function fullDatasetValidationSuite(doc) {

}


/**
 * @returns {native JSON} result
 */
function validateExample() {
  const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/bcodmo_dataset.json');
  // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');
  const doc = JSON.parse(docSrc);
  printLine(); //Start line

  const result = isValidDataset(doc);

  printLargeObj(result);

  return result;
}



module.exports = {
  validateDatasetDocument,
  validateOrganizationDocument,
  fullDatasetValidationSuite,
  validateExample
};