const fs = require('fs');

const { validateJSON } = require('./validateJSON');
const { printLine, printLargeObj } = require('./funcs');

const { datasetPrimativesValidator } = require('./js_templates/dataset_template_primatives');

const JSONLD_TEMPLATE_FOLDER = '../jsonld_templates/';
const JSONLD_EXAMPLES_FOLDER = '../jsonld_examples/';

validateLocalExample();
return;

function validateLocalExample() {
  // Read example
  const docSrc = fs.readFileSync(JSONLD_EXAMPLES_FOLDER + 'datasets/bcodmo_dataset.json');
  const templateSrc = fs.readFileSync(JSONLD_TEMPLATE_FOLDER + 'datasets/dataset_template.json');

  const doc = JSON.parse(docSrc);
  const template = JSON.parse(templateSrc);

  printLine(); //Start line
  printLargeObj(doc);
  printLargeObj(template);

  const result = {};
  validateJSON(doc, datasetPrimativesValidator, result);

  printLargeObj(result);

  // console.log(result.creator[0]);

  return;
}
