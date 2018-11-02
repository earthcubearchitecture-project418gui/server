// const jsonld = require('jsonld');

const { deepCopyKeys } = require('./funcs');

// Remove inner if
// 
// @params {doc} should be representable in JSON, ie. no prototypes or functions for values
function validateJSON(doc, validator, result) {
  result = result || {};
  for (let k in validator) {
    // if (k === 'creator') {
    //   console.log('hit');
    //   debugger;
    // }

    if (doc[k] == undefined) {         //Missing, currently assuming its required
      result[k] = false;
    } else if (Array.isArray(validator[k]) && !Array.isArray(doc[k])) {
      //Multiple allowed by validator, only one value present on doc
      //Check type
      if (typeof doc[k] !== 'object') {
        //doc[k] is not 'object' or 'array', must be invalid
        result[k] = false;
      } else {
        result[k] = validateJSON(doc[k], validator[k], result[k]);
      }
    } else if (Array.isArray(validator[k]) && Array.isArray(doc[k])) {
      result[k] = doc[k].map(inner =>
        result[k] = validateJSON(inner, validator[k][0], deepCopyKeys(validator[k][0], false)));
    } else if (typeof validator[k] == 'function') {
      result[k] = validator[k](doc[k])
    } else {
      console.log('Validation error : ', {
        validator: validator[k],
        doc: doc[k]
      });
    }
  }
  return result;
}

module.exports = {
  validateJSON
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