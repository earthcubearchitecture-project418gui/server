// const jsonld = require('jsonld');

const { printLine, printLargeObj } = require('./funcs');
const { deepCopyKeys } = require('./funcs');

/**
 * @param {doc} object should be representable in JSON, ie. no prototypes or functions for values
 * @param {validator} object
 * @param {result} object can be null, results are added to object
 */
function validateJSON(doc, validator, result) {
  result = result || {};
  for (let k in validator) {
    // if (k === 'geo') {
    //   console.log('hit');
    //   debugger;
    // }

    if (doc[k] == undefined) {         //Missing, currently assuming its required
      result[k] = false;
    } else if (isArray(validator[k]) && !isArray(doc[k]) && isObject(doc[k])) {
      //Multiple allowed by validator, only one value present on doc, acceptable
      result[k] = validateJSON(doc[k], validator[k][0], result[k]);
    } else if (isArray(validator[k]) && isArray(doc[k])) {
      result[k] = doc[k].map(inner => {
        // Before decent, check doc[i] is 'object'
        if (isArray(inner) || typeof inner !== 'object') {
          return false;
        }
        return validateJSON(inner, validator[k][0], deepCopyKeys(validator[k][0], false));
      });
    } else if (typeof validator[k] == 'function') {
      result[k] = validator[k](doc[k]);
    } else if (isObject(validator[k])) {
      result[k] = validateJSON(doc[k], validator[k]);
    } else {
      result[k] = false;
      console.log('Validation error : ', {
        validator: validator[k],
        doc: doc[k]
      });
    }
  }
  return result;
}

function isArray(a) { return Array.isArray(a); }
function isObject(o) { return (typeof o === 'object'); }

// --- Example ---
const fs = require('fs');

const { datasetPrimativesValidator } = require('./js_templates/dataset_template_primatives');

const JSONLD_TEMPLATE_FOLDER = '../jsonld_templates/';
const JSONLD_EXAMPLES_FOLDER = '../jsonld_examples/';

/**
 * @returns {native JSON} result
 */
function validateLocalExample() {
  // Read example
  const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/bcodmo_dataset.json');
  // const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/ieda_dataset.json');

  const doc = JSON.parse(docSrc);

  printLine(); //Start line
  // printLargeObj(doc);

  const result = validateJSON(doc, datasetPrimativesValidator);

  // printLargeObj(result);

  return result;
}


module.exports = {
  validateJSON,
  validateLocalExample
}

