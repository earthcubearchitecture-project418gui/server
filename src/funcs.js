

function walkObjAndVisit(obj, visitor) {
  const result = {};
  for (k in visitor) {
    if (!visitor.hasOwnProperty(k)) { continue; }
    // console.log(' | Key : ', k);
    result[k] = visitor[k](obj[k], k);
  }
  return result;
}


// @params {scalar, arra} => replacments for values found
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

//Might be replacable with something from lodash, ramda
function deepCopyKeys(obj, scalar) {
  const result = {};
  for (let k in obj) {
    if (Array.isArray(obj[k])) {
      result[k] = scalar;
    } else if (typeof obj[k] === 'object') {
      result[k] = deepCopyKeys(obj[k], scalar);
    } else {
      result[k] = scalar;
    }
  }
  return result;
}


function printLine() { console.log('-'.repeat(80)); }
function printLargeObj(obj) {
  console.log(JSON.stringify(obj, undefined, 2));
  printLine();
}

module.exports = {
  walkObjAndVisit,
  printLine,
  printLargeObj,
  deepCopyKeys
}