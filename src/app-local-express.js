const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { validateJSON } = require('./validateJSON');
const { datasetPrimativesValidator } = require('./js_templates/dataset_template_primatives');

app.get('/', (req, res) => res.send('Hello World!'));

app.use(bodyParser.text({ type: 'application/json' }));

app.post('/validate', (req, res) => {
  console.log('Hit [/validate]');
  // if (req.get('Content-Type') !== 'application/json') {
  //   console.log('Invalid Content-Type');
  //   res.send('Invalid Content-Type');
  //   return;
  // }

  const body = req.body;

  console.log('Body : ');
  console.log(body);
  console.log(typeof body);

  // Parse Body to JSON
  let input;
  try {
    // input = JSON.parse(`{"WHAT":"OKAY"}`);
    input = JSON.parse(body);
  } catch (e) {
    console.log("Failed to parse JSON : ", e);
    res.send("Failed to parse JSON");
    return;
  }

  let result = validateJSON(input, datasetPrimativesValidator, {});

  res.send(JSON.stringify(result));
  // res.send('Hello validate');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));