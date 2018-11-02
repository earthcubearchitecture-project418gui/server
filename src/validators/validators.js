
const validator = require('validator');
const R = require('ramda');

/// Validators return true if pass, string if fail

function isURL(input) {
  let res = validator.isURL(input);
  if (!res) {
    return "Not a URL : " + input;
  }
  return true;
}

function isString(input) {
  let res = (typeof input === 'string');
  if (!res) {
    return "Not a string.";
  }
  return true;
}

function isStringArray(input) {
  if (!Array.isArray(input)) {
    return "Not an array";
  }
  for (const v of input) {
    const res = isString(v);
    if (!typeof res === 'boolean') {
      return res;
    }
  }
  return true;
}

function isCoord(input) {
  let res = validator.isFloat(input, { min: -180, max: 180 });
  if (!res) {
    return 'Invalid Coordinate : ' + input + '\n Range is (-180, 180)';
  }
  return true;
}

// function isFloat(input) {
//   let res = validator.isFloat(input, )
// }

function isBox(input) {
  // const original = input;
  // //Test for non-numeric chars
  // let test = input.replace(/,|-/g, ' ');
  // let res = validator.isNumeric(test);
  // if (!res) {
  //   return "Contains non-numeric values";
  // }

  let coordPairs = /(-?\d*\.\d+,-?\d*\.\d+)/g;
  res = input.match(coordPairs);
  if (res === null) {
    return "No coordinates detected.";
  }
  if (res.length = 2) {
    return "Incorrect number of coordinates.";
  }
  return true;
}

function isPolygon(input) {
  // const original = input;
  // //Test for non-numeric chars
  // let test = input.replace(/,|-/g, ' ');
  // let res = validator.isNumeric(test);
  // if (!res) {
  //   return "Contains non-numeric values";
  // }

  let coordPairs = /(-?\d*\.\d+,-?\d*\.\d+)/g;
  res = input.match(coordPairs);
  if (res === null) {
    return "No coordinates detected.";
  }
  if (res.length < 3) {
    return "Not enough coordinates.";
  }
  return true;
}

function isMimeType(input) {
  let res = validator.isMimeType(input);
  if (!res) {
    console.log("Not recognized as MimeType : " + input);
  }
}

// function isBoolean(input) { return (typeof input === 'boolean'); }

module.exports = {
  isString,
  isStringArray,
  // isBoolean,
  // isFloat,
  isPolygon,
  isBox,
  isMimeType,
  isCoord,
  isURL,
}