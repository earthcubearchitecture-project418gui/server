
'use strict';

const fs = require('fs');
const path = require('path');

const djvValidator = require('../share/djv-ucar.js')();

const { printLine, printLargeObj } = require('../share/funcs.js');
const { isValidDataset } = require('../share/dataset_validation.js');

const UCAR_FOLDER = path.join(__dirname, '..', 'share');
const JSONLD_EXAMPLES_FOLDER = path.join(UCAR_FOLDER, 'jsonld_examples', 'datasets');
// const JSONLD_TEMPLETE_FOLDER = path.join(UCAR_FOLDER, 'jsonld_templete', 'datasets');

const UCAR_SCHEMA_FOLDER = path.join(__dirname, '..', 'schema');

if (process.argv.includes('--example')) {
  let out;
  let i = process.argv.findIndex(() => '--out');
  if (i) {
    out = process.argv[i + 1];
    console.log('Writing out to : ', out);
  }
  validateExampleViaDJV(out);
}


// /**
//  * @returns {native JSON} result
//  */
// function validateExample() {
//   const docSrc = fs.readFileSync(path.join(JSONLD_EXAMPLES_FOLDER, 'bcodmo_dataset.json'));
//   // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');
//   const doc = JSON.parse(docSrc);
//   // printLine(); //Start line
//
//   const result = isValidDataset(doc);
//
//   // printLargeObj(result);
//
//   return result;
// }

/**
 * @param {string} fileName
 */
function validateExampleViaDJV(outputFile) {
  const docSrc = fs.readFileSync(path.join(JSONLD_EXAMPLES_FOLDER, 'bcodmo_dataset.json'));
  const doc = JSON.parse(docSrc);

  const schemaSrc = fs.readFileSync(path.join(UCAR_SCHEMA_FOLDER, 'dataset.json'));
  const schema = JSON.parse(schemaSrc);

  let result = djvValidator.validate(schema, doc);

  try {
    result = JSON.stringify(result);
  } catch (e) {
    console.log(" [validateLocalExample] JSON.stringify error : ", e);
    return;
  }

  if (outputFile) {
    fs.writeFileSync(outputFile, result);
  } else {
    console.log({result});
  }
}
