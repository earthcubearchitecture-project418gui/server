const fs = require('fs');

const { printLine, printLargeObj } = require('./funcs');
const { validateJSON } = require('./validateJSON');

const { datasetPrimativesValidator } = require('./js_templates/dataset_primatives');
const { datasetPrimativeOptionality } = require('./js_templates/dataset_primatives_optionality');
const { datasetStage2Validator } = require('./js_templates/dataset_stage2');

const { orgPrimativesValidator } = require('./js_templates/org_primatives');

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
  const result = validateJSON(doc, orgPrimativesValidator);
  return result;
}

function fullDatasetValidationSuite(doc) {
  const primativeResult = validateJSON(doc, datasetPrimativesValidator);
  const requiredPrimatives = validateJSON(primativeResult, datasetPrimativeOptionality);
  const stage2Result = validateJSON(primativeResult, datasetStage2Validator);

  return {
    primativeResult,
    requiredPrimatives,
    stage2Result
  };
}


/**
 * @returns {native JSON} result
 */
function validateExample() {
  const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/bcodmo_dataset.json');
  // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');
  const doc = JSON.parse(docSrc);
  printLine(); //Start line

  const primativeResult = validateJSON(doc, datasetPrimativesValidator);
  const requiredPrimatives = validateJSON(primativeResult, datasetPrimativeOptionality);
  const stage2Result = validateJSON(primativeResult, datasetStage2Validator);

  // printLargeObj(primativeResult);
  printLargeObj(requiredPrimatives);
  // printLargeObj(stage2Result);

  return {
    primativeResult,
    requiredPrimatives,
    stage2Result
  };
}

module.exports = {
  validateDatasetDocument,
  validateOrganizationDocument,
  fullDatasetValidationSuite,
  validateExample
};