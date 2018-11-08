// const jsonld = require('jsonld');

const { deepCopyKeys } = require('./funcs');

/**
 * @param {doc} object should be representable in JSON, ie. no prototypes or functions for values
 * @param {validator} object
 * @param {result} object can be null, results are added to object
 * @return object | Duplicates structure of validator, 
 * Possible primative values | true = passed validation, false = missing on doc, string = failed validation
 */
function validateJSON(doc, validator, result) {
  result = result || {};
  for (let k in validator) {
    // if (k === 'geo') {
    //   console.log('hit');
    //   debugger;
    // }

    if (doc[k] == undefined) {         //Missing, mark as false
      result[k] = false;
    } else if (isArray(validator[k]) && !isArray(doc[k]) && isObject(doc[k])) {
      //Multiple allowed by validator, only one value present on doc, acceptable
      result[k] = validateJSON(doc[k], validator[k][0], result[k]);
    } else if (isArray(validator[k]) && isArray(doc[k])) {
      result[k] = doc[k].map(inner => {
        // Before decent, check doc[k][n] is 'object'
        if (isArray(inner) || typeof inner !== 'object') {
          return false;
        }
        return validateJSON(inner, validator[k][0]);
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

module.exports = {
  validateJSON
}

