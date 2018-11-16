// No longer necessary, use package.json "test"
// Simple script to test schema and all example docs
// Could use rewrite

const fs = require('fs');
const path = require('path');
const join = path.join;

const Ajv = require('ajv');

const OUTPUT_FILE = 'results.json';

main(); return;

function main() {
  const testsets = [
    {
      schema: join('src', 'schema', 'dataset'),
      docDirectory: join('src', 'share', 'jsonld_examples', 'datasets')
    }
  ];

  let results = testsets.map((test, i) => {
    const result = testSet(test);
    result['test'] = i;
    return result;
  });
  results = JSON.stringify(results, undefined, 2);
  console.log(results);

  // fs.writeFileSync(OUTPUT_FILE, results);
}

function testSet(test) {
  const schema = JSON.parse(fs.readFileSync(join('./', test.schema + '.json')));
  // console.log(schema);
  const docs = fs.readdirSync('./' + test.docDirectory);

  return docs.map(docFile => {
    console.log('Testing file : ', docFile);
    let doc;

    try {
      doc = JSON.parse(fs.readFileSync(join(test.docDirectory, docFile)));
    } catch (e) {
      const msg = 'Error parsing JSON doc : ' + e.message;
      console.log(msg);
      return { result: msg };
    }

    const result = ajvTest(schema, doc);
    result['doc'] = test.docDirectory + docFile;
    return result;
  });
}

function ajvTest(schema, doc) {
  var ajv = new Ajv({ allErrors: true });
  var validator = ajv.compile(schema);
  var valid = validator(doc);

  if (!valid) {
    // console.log('Errors');
    // console.log(validator.errors);
    return {
      result: validator.errors
    }
  } else {
    // console.log('Valid!');
    return {
      result: 'Valid'
    }
  }
}

