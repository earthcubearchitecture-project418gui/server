
const validator = require('validator');
const R = require('ramda');

function required(predicate) {
  return function (value, key) {
    if (value === undefined) {
      return "REQUIRED : " + key;
    }
    return predicate(value, key)
  }
}

/// Validators return true if pass, string if fail

function isURL(input) {
  let res = validator.isURL(input);
  if (!res) {
    return "Not a URL > " + input;
  }
  return true;
}

function isString(input) {
  let res = (typeof input === 'string');
  if (!res) {
    return "Not a string > " + input;
  }
  return true;
}

function isStringArray(input) {
  if (!Array.isArray(input)) {
    return "Not an array";
  }
  for (const v of input) {
    const res = isString(v);
    if (res !== true) {
      return "Inside string array > " + res;
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
  let res = isStringOfNumbers(input);
  if (res !== true) { return 'Invalid Box > ' + res; }
  //Regex, finds coordinate pairs, requires leading 0. ".314" not accepted
  res = isSeriesOfCoordinates(input);
  if (typeof res === 'string') { return res; }

  if (res !== 2) {
    return 'Incorrect number of coordinates > ' + input + ` has ${res} coords.`;
  }
  return true;
}

function isPolygon(input) {
  let res = isStringOfNumbers(input);
  if (res !== true) { return 'Invalid Polygon > ' + res; }

  res = isSeriesOfCoordinates(input);
  if (res < 3) {
    return "Not enough coordinates > " + input.trim() + ` has ${res} coords.`;
  }
  return true;
}

function isMimeType(input) {
  let res = validator.isMimeType(input);
  if (!res) {
    console.log("Not recognized as MimeType : " + input);
  }
}

function isBoolean(input) {
  if (typeof input === 'boolean') {
    return true;
  } else {
    return "Needs to be true or false > " + input;
  }
}

/**
 * @param {string} input | example : 24.94972,-80.45361 24.94972,-80.45361
 * @returns {string | number} string = error | number = # of coords
 */
function isSeriesOfCoordinates(input) {
  let coordPairs = /(-?\d*\.\d+,-?\d*\.\d+)/g;
  res = input.match(coordPairs);
  if (res === null) {
    return 'No coordinates detected > ' + input;
  }
  return res.length;
}

//Weak check for charaters that dont belong in series of numbers
function isStringOfNumbers(input) {
  //Test for non-numeric chars
  let test = input.replace(/,|\.|-|\s/g, '');
  console.log('[isBox] : ', input, ' : ', test);
  let res = validator.isNumeric(test);
  // let res = validator.isNumeric(input);
  if (!res) {
    const invalidChars = '[' + test.replace(/[0-9]/g, '').split('').join(',') + ']';
    return "Contains non-numeric values, such as " + invalidChars;
  }
  return true;
}


// Stage 2 validators

/**
 * @param {key} key to access object with
 * @returns predicate to use against obj
 */
function hasValidatedProp(key) {
  return obj => R.has(key)(obj) && obj[key] === true;
}

/**
 * 
 * @param {geo obj or array} input 
 */
function isGeos(input) {
  if (Array.isArray(input)) {
    return input.map(geo => isGeos(input));
  }

  const { allPass } = R;
  const has = hasValidatedProp;

  if (allPass([has('longitude'), has('latitude')])(input)) {
    return true;
  }
  if (has('box')(input)) {
    return true;
  }
  if (has('polygon')(input)) {
    return true;
  }

  return "Invalid Geo object.";

}

module.exports = {
  required,
  isString,
  isStringArray,
  isBoolean,
  // isFloat,
  isPolygon,
  isBox,
  isMimeType,
  isCoord,
  isURL,

  isGeos
}