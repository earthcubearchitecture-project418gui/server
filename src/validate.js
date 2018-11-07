const fs = require('fs');

const { printLine, printLargeObj } = require('./funcs');
const { validateJSON } = require('./validateJSON');

const { datasetPrimativesValidator } = require('./js_templates/dataset_template_primatives');
const { datasetStage2Validator } = require('./js_templates/dataset_template_stage2');

const { orgPrimativesValidator } = require('./js_templates/org_template_primatives');

const JSONLD_EXAMPLES_FOLDER = 'jsonld_examples/';

/**
 * 
 * @param {obj} doc 
 */
function validateDatasetDocument(doc) {
  const result = validateJSON(doc, datasetPrimativesValidator);
  return result;
}

/**
 * 
 * @param {obj} doc 
 */
function validateOrganizationDocument(doc) {
  const result = validateJSON(doc, orgPrimativesValidator);
  return result;
}




// --- Example ---

/**
 * @returns {native JSON} result
 */
function validateLocalExample() {
  const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/bcodmo_dataset.json');
  // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');
  const doc = JSON.parse(docSrc);
  printLine(); //Start line

  const result = validateJSON(doc, datasetPrimativesValidator);
  const stage2_result = validateJSON(result, datasetStage2Validator);

  printLargeObj(result);
  printLargeObj(stage2_result);

  return result;
}

module.exports = {
  validateDatasetDocument,
  validateLocalExample
};