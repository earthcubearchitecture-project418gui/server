const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const { validateJSON } = require('./validateJSON');
const { datasetPrimativesValidator } = require('./js_templates/dataset_template_primatives');


// app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/json' }));

app.post('/validate', (req, res) => {
  console.log('Hit [/validate]');

  const body = req.body;

  // console.log('Body : ');
  // console.log(body);
  // console.log(typeof body);

  // Parse Body to JSON
  let input;
  try {
    input = JSON.parse(body);
  } catch (e) {
    console.log("Failed to parse JSON : ", e);
    res.send("Failed to parse JSON");
    return;
  }

  const result = validateJSON(input, datasetPrimativesValidator, {});
  const result_string = JSON.stringify(result, undefined, 2);
  console.log(result_string);

  res.send(result_string);
});


app.use(express.static(__dirname + '/public'));


app.listen(PORT, () => console.log(`JSON-LD validator app listening on port ${PORT}.`));