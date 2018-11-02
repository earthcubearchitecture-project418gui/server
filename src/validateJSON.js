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
    if (k === 'creator') {
      console.log('hit');
      debugger;
    }

    if (doc[k] == undefined) {         //Missing, currently assuming its required
      result[k] = false;
    } else if (Array.isArray(validator[k]) && !Array.isArray(doc[k]) && typeof doc[k] !== 'object') {
      //Multiple allowed by validator, only one value present on doc, acceptable
      result[k] = validateJSON(doc[k], validator[k], result[k]);
    } else if (Array.isArray(validator[k]) && Array.isArray(doc[k])) {
      result[k] = doc[k].map(inner => {
        // Before decent, check doc[i] is 'object'
        if (Array.isArray(inner) || typeof inner !== 'object') {
          return false;
        }
        return validateJSON(inner, validator[k][0], deepCopyKeys(validator[k][0], false));
      });
    } else if (typeof validator[k] == 'function') {
      result[k] = validator[k](doc[k]);
    } else if (typeof validator[k] == 'object') {
      validateJSON(doc[k], validator[k], result[k]);
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

  const doc = JSON.parse(docSrc);

  printLine(); //Start line
  printLargeObj(doc);

  const result = validateJSON(doc, datasetPrimativesValidator);

  printLargeObj(result);

  return result;
}


module.exports = {
  validateJSON,
  validateLocalExample
}

// else if (Array.isArray(validator[k])) {
//   //either array of functions or objects.
//   //if objects, continue desent
//   //check if doc is array first
//   //Wrong, doc[k] doesnt have to be array
//   if (!Array.isArray(doc[k])) {
//     result[k] = false;
//   }
//   //Array of objects on validator signify array of objs in doc
//   //Array of functions on validator signify 
//   else if (typeof validator[k][0] === 'object') {
//     result[k] = doc[k].map(inner =>
//       result[k] = validateJSON(inner, validator[k][0], deepCopyKeys(validator[k][0], false)));
//   } else if (typeof validator[k][0] === 'function') {
//     console.log('Needs refactor before use.');
//   }
// } else if (typeof validator[k] == 'object') {
//   //isObjectNotArray
//   if (typeof doc[k] === 'object' && !Array.isArray(doc[k])) {
//     result[k] = validateJSON(doc[k], validator[k], result[k]);
//   } else {
//     result[k] = false;
//   }
// }