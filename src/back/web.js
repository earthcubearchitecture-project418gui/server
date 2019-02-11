#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const app = express();

const public = process.env.NODE_WWW || './public';

console.log(process.argv);
const secure = -1 === process.argv.findIndex(arg => arg === '--unsecure');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Mode");
  next();
});

app.options('/*', function(req,res) {
  console.log("Hit [OPTIONS /*]");
  // Access-Control-Allow-Origin: http://foo.example
  // Access-Control-Allow-Headers: X-PINGOTHER, Content-Type

  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Max-Age", "86400");
  res.sendStatus(200);
});

const schemaPath = path.join(public, 'schema');
app.use('/api', require('./routes.js')(schemaPath));

app.use(express.static(public));

if (secure) {
  const PORT = process.env.PORT || 443;

  const certPath = process.env.NODE_CERT || (path.join(__dirname, '..', '..', 'ssl', 'server.crt'));
  const keyPath = process.env.NODE_KEY || (path.join(__dirname, '..', '..', 'ssl', 'server.key'));

  console.log('Public folder : ', public);
  console.log('Crt : ', certPath);
  console.log('Key : ', keyPath);

  const httpsOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };

  https.createServer(httpsOptions, app).listen(PORT, () => console.log(`JSON-LD validator app listening on port ${PORT}, with HTTPS.`));

} else {
  console.log('Public folder : ', public);

  app.listen(8081, () => console.log(`JSON-LD validator app listening on port ${8081}, with HTTP.`));
}
