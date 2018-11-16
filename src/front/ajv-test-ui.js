const schema = require('../schema/dataset.json');

const AJV = require('ajv');
const ajv = new AJV({ allErrors: true });
const validator = ajv.compile(schema);

function requireAll(r) { r.keys().forEach(r); return r; }
const docsContext = requireAll(require.context('../share/jsonld_examples/datasets/', true, /\.json$/));
let docs = docsContext.keys().map(key => ({ [key]: docsContext(key) }));
// docs = Object.assign({}, ...docs);
console.log(docs);

var Split = require('split.js')

document.addEventListener('DOMContentLoaded', function () {
  Split(['#one', '#two'], {
    minSize: [200, 200]
  });

  const select = document.querySelector('#doc-selector');
  const input = document.querySelector('#input');
  const output = document.querySelector('#output');

  for (let n = 0; n < docs.length; n++) {
    const opt = document.createElement('option');
    const txt = Object.keys(docs[n])[0];             // Retrieve only key
    const txtNode = document.createTextNode(txt);

    opt.appendChild(txtNode);
    select.appendChild(opt);
  }

  select.addEventListener('change', function (e) {
    const id = select.value;
    const doc = docs.filter(doc => doc.hasOwnProperty(id))[0];
    input.value = JSON.stringify(doc[id], undefined, 2);
    validate();
  });


  function validate() {
    output.value = "";

    const result = validator(JSON.parse(input.value));
    const errors = validator.errors;

    if (result) {
      output.value = "Valid.";
    } else {
      output.value = JSON.stringify(errors, undefined, 2);
    }
  }

});
