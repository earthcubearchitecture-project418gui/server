const schema = require('../schema/dataset.json');
const exampleDoc = require('../share/jsonld_examples/datasets/bcodmo_dataset.json');

// const ajv = require('./ajv-example.js');
// ajv.example(schema, exampleDoc);

const rjs = require('./react-jsonschema-example.js');
rjs.example(schema);

// const validator = require('../share/dataset_validation.js');
// const result = validator.isValidDataset(exampleDoc);
// console.log('Functional validator result : ', result);



