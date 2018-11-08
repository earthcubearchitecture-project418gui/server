#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// TODO add automatic HTTP / HTTPS control path based on port
// For now assume
const PORT = process.env.PORT || 443;
const public = process.env.NODE_WWW || (path.join(__dirname, 'public'));

const certPath = process.env.NODE_CERT || (path.join(__dirname, 'ssl', 'server.crt'));
const keyPath = process.env.NODE_KEY || (path.join(__dirname, 'ssl', 'server.key'));

console.log('Public folder : ', public);
console.log('Crt : ', certPath);
console.log('Key : ', keyPath);

const httpsOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath)
}

const { validateDatasetDocument } = require('./validate.js');
const { datasetPrimativesValidator } = require('./js_templates/dataset_primatives.js');

// app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/json' }));

app.post('/validate_dataset', (req, res) => {
  console.log('Hit [/validate_dataset]');
  // console.log('Body : ');
  // console.log(body);
  // console.log(typeof body);

  let inputDocument;
  try {
    inputDocument = JSON.parse(req.body);
  } catch (e) {
    console.log("Failed to parse JSON : ", e);
    res.send("Failed to parse JSON");
    return;
  }

  // const result = validateJSON(inputDocument, datasetPrimativesValidator, {});
  const result = validateDatasetDocument(inputDocument, datasetPrimativesValidator, {});
  const result_string = JSON.stringify(result, undefined, 2);

  console.log(result_string);
  res.send(result_string);
});

app.post('/validate_org', (req, res) => {
  console.log('Hit [/validate_org]');

  let inputDocument;
  try {
    inputDocument = JSON.parse(req.body);
  } catch (e) {
    console.log("Failed to parse JSON : ", e);
    res.send("Failed to parse JSON");
    return;
  }

  const result = validateJSON(inputDocument, datasetPrimativesValidator, {});
  const result_string = JSON.stringify(result, undefined, 2);

  console.log(result_string);
  res.send(result_string);
});


app.use(express.static(public));


// app.listen(PORT, () => console.log(`JSON-LD validator app listening on port ${PORT}.`));
https.createServer(httpsOptions, app).listen(PORT, () => console.log(`JSON-LD validator app listening on port ${PORT}.`));