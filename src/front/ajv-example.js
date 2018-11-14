const Ajv = require('ajv')

function example(schema, doc) {
  var ajv = new Ajv({ allErrors: true });
  var validator = ajv.compile(schema);
  var valid = validator(doc);

  if (!valid) {
    console.log('Errors');
    console.log(validator.errors);
  } else {
    console.log('Valid!');
  }
}

module.exports = {
  example
}