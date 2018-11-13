const schema = require('../src/schema/dataset.json');
const exampleDoc = require('../jsonld_examples/datasets/bcodmo_dataset.json');

const Ajv = require('ajv')

var ajv = new Ajv({ allErrors: true });
var validator = ajv.compile(schema);
var valid = validator(exampleDoc);

if (!valid) {
  console.log('Errors');
  console.log(validator.errors);
} else {
  console.log('Valid!');
}



