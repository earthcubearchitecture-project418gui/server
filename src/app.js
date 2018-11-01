const jsonld = require('jsonld');
const fs = require('fs');

const printLine = () => console.log('-'.repeat(80));

const docSrc = fs.readFileSync('bcodmo_org.json');
const templateSrc = fs.readFileSync('org_template.json');

const doc = JSON.parse(docSrc);
const template = JSON.parse(templateSrc);
console.log(doc);
printLine();
console.log(template);
printLine();

const templateValidator = JSON.parse(templateSrc);
delete templateValidator['@context'];

const result = JSON.parse(templateSrc);
delete result['@context'];


deepReplaceValues(templateValidator, isString, isStringArray);
deepReplaceValues(result, false);

printLine();

console.log(templateValidator);
printLine();
console.log(result);

ValidateJSON(doc, templateValidator, result);

printLine();
console.log(result);

return;

// ---------------------------------------------

// @params {doc, validator} are pure JSON
function ValidateJSON(doc, validator, result) {
  for (let k in validator) {
    if (doc[k] == undefined) {
      result[k] = false;
    } else if (typeof validator[k] == 'function') {
      result[k] = validator[k](doc[k])
    } else if (typeof validator[k] == 'object') {
      ValidateJSON(doc[k], validator[k], result[k]);
    } else {
      console.log('Validation error : ', {
        validator: validator[k],
        doc: doc[k]
      });
    }
  }
}



// @params {scalar, arra} => validator functions
function deepReplaceValues(obj, scalar, array) {
  if (typeof array == 'undefined') {
    array = scalar;
  }

  for (let k in obj) {
    if (Array.isArray(obj[k])) {
      obj[k] = array;
    } else if (typeof obj[k] == 'object') {
      deepReplaceValues(obj[k], scalar, array);
    } else {
      obj[k] = scalar;
    }
  }
}

//Validators

function isString(input) {
  return typeof input == 'string';
}

function isStringArray(input) {
  if (!Array.isArray(input)) {
    return false;
  }
  for (const v of input) {
    if (!isString(v)) {
      return false;
    }
  }
  return true;
}