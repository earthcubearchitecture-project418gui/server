
// const BACK_END = 'http://localhost:8081';
const BACK_END = 'https://earthcube.isti.com';

const selectSubsection = document.querySelector('#subsection');
// const buttonExtract = document.querySelector('#extract');
const buttonValidate = document.querySelector('#validate');

const inputSchema = document.querySelector('#input-schema');
const inputDoc = document.querySelector('#input-doc');
const output = document.querySelector('#output');

let schema, doc, required, catagories;

document.addEventListener('DOMContentLoaded', function () {
  selectSubsection.addEventListener('change', onSubsectionChange);
  buttonValidate.addEventListener('click', onValidate);
  const orgFile = getFile('schema/organizations.json');
  const example = getFile('organizations/bcodmo_org.json');

  Promise.all([orgFile, example]).then(afterFileRetrieval);
});

function afterFileRetrieval(files) {
  // const [orgSchema, example] = files;
  schema = files[0];
  doc = files[1];

  // console.log({schema, doc});

  const groups = getGroups(schema);
  // console.log({groups});

  catagories = generateSchemaFromGroups(schema, groups);
  // console.log({ catagories });

  for (let k in catagories) {
    const o = createOption(k);
    selectSubsection.appendChild(o);
  }
}

function getFile(file) {
  return fetch(file)
    .then(res => {
      if (!res.ok) { return Promise.reject("Failed with status : " + res.status + " | " + res.statusText); }
      return res.json();
    })
    .catch(err => console.log(err));
}

function getGroups(schema) {
  return schema['groups'];
}

//Retrieves parts of schema that match with 
/**
* @param {object} schema Should be full schema json
* @param {object} groups Object that contains arrays of keys. 
*    Will search schema for properties with keys, will place subsection of schema into return object.
*/
function generateSchemaFromGroups(schema, groups) {
  subSchemas = {};

  for (let group in groups) {
    subSchemas[group] = {};

    for (let k of groups[group]) {
      subSchemas[group][k] = schema.properties[k];
    }
  }
  return subSchemas;
}

function createOption(text) {
  const t = document.createTextNode(text);
  const e = document.createElement('option');
  e.appendChild(t);
  return e;
}

// Split schema and example doc on group selected
// Forward sub sections to textarea and global required
function onSubsectionChange(e) {
  console.log(e);
  const key = e.target.value;
  inputSchema.value = JSON.stringify(catagories[key], undefined, 2);

  const retrivalKeys = Object.keys(catagories[key]);
  const result = {};
  retrivalKeys.forEach(key => result[key] = doc[key]);
  required = retrivalKeys.filter(key => -1 !== schema.required.findIndex(req=> req == key));
  console.log('Required:',{required});
  inputDoc.value = JSON.stringify(result, undefined, 2);
}

function onValidate(e) {
  const schema = JSON.stringify(
    schemaShell(JSON.parse(inputSchema.value), required)
  );

  const options = {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      mode: 'cors'
    },
    body: '{ "schema": ' + schema + ' , ' +
           ' "doc": '    + inputDoc.value + ' }'
  };

  fetch(BACK_END + '/api/validate_ajv', options)
    .then(res => res.json()) 
    .then(res => {
      console.log(res);
      output.value = JSON.stringify(res, undefined, 2);
    })
    .catch(err => {
      console.error('Request failed', err)
    });
}

function schemaShell(props, required) {
  required = required || [];
  return {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://earthcube.isti.com/ucar-json-ld.organization.schema.json",
    "title": "UCAR organization",
    "description": "",
    "type": "object",
    "required": required,
    "properties": props
  };
}