const fs = require('fs');

const { walkObjAndVisit, printLine, printLargeObj } = require('./funcs');
const validationObjects = require('./js_templates/dataset_validation_objects');

const JSONLD_EXAMPLES_FOLDER = 'jsonld_examples/';


/**
 * 
 * @param {obj} doc 
 */
function validateDatasetDocument(doc) {
  const result = fullDatasetValidationSuite(doc);
  return result;
}

/**
 * 
 * @param {obj} doc 
 */
function validateOrganizationDocument(doc) {
  return result;
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


function isValidDataset(input) {
  const validator = validationObjects.datasetTopValidator;
  const result = walkObjAndVisit(input, validator);
  return result;
}

module.exports = {
  validateDatasetDocument,
  validateOrganizationDocument,
  fullDatasetValidationSuite,
  validateExample
};