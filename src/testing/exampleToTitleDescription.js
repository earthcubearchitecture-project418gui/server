
const fs = require('fs');
const path = require('path');

// const example = '../share/jsonld_templates/datasets/dataset_template.json';
const example = '../share/jsonld_templates/organizations/org_template.json';

const data = JSON.parse(fs.readFileSync(example));

const result = walkObjAndVisit(data, spliter, true);

console.log(JSON.stringify(result, undefined, 2));

function spliter(input) {
  let v = input;
  if (typeof v !== 'string') { return input; }
  v = v.trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    v = v.substring(1, v.length - 2);
  } else {
    return input;
  }
  //comma count needs to be 1
  // if (2 !== v.split('').filter(c => c === ',').length) { return input; }
  // v = v.split(',');
  const i = v.indexOf(',');
  return {
    title: v.substring(0, i).trim(),
    description: v.substring(i+1).trim()
  };
}


function walkObjAndVisit(obj, visitor, ifRecurseOnObj) {
  const result = {};
  for (let k in obj) {
    // if (!obj.hasOwnProperty(k)) { continue; }
    // console.log(' | Key : ', k);
    if (ifRecurseOnObj && typeof obj[k] === 'object' && obj[k] !== null) {
      result[k] = walkObjAndVisit(obj[k], visitor, ifRecurseOnObj);
    } else {
      result[k] = visitor(obj[k], k);
    }
  }
  return result;
}