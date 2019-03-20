#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const logger = require('./logging.js');
const app = express();

const public = process.env.NODE_WWW || './public';
const schemaPath = './src/schema/';

const secure = -1 === process.argv.findIndex(arg => arg === '--unsecure');

logger.info('MODE: ' + ( secure ? 'secure' : 'unsecure'));

// Logging
app.use(function(req, res, next) {
  const { ip, method, path } = req;
  logger.info('New Connection', { ip, method, path });
  next();
});

// Adds CORS headers
// Allows access from other domains when in browser
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Mode");
  next();
});

app.options('/*', function(req,res) {
  // console.log("Hit [OPTIONS /*]");
  // Access-Control-Allow-Origin: http://foo.example
  // Access-Control-Allow-Headers: X-PINGOTHER, Content-Type

  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Max-Age", "86400");
  res.sendStatus(200);
});

app.use('/api', require('./routes.js')(schemaPath));

(function (app) {
  const names = ['dataset', 'organizations'];
  
  names.forEach(filename => {
    const location = schemaPath + filename + '.json';
    const endPoint = '/schema/' + filename + '.json';
    app.use(endPoint, express.static(location));

    //TODO for future use
    //convert to a buffer and send to client
    // var fileContents = new Buffer(attachment.ContentBytes, "base64");
    // return res.send(200, fileContents);
  });
})(app);

app.use(express.static(public));

if (secure) {
  const PORT = process.env.PORT || 443;

  const certPath = process.env.NODE_CERT || (path.join(__dirname, '..', '..', 'ssl', 'server.crt'));
  const keyPath = process.env.NODE_KEY || (path.join(__dirname, '..', '..', 'ssl', 'server.key'));

  logger.info('Public folder : ' + public);
  logger.info('Crt : ' + certPath);
  logger.info('Key : ' + keyPath);

  const httpsOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };

  https.createServer(httpsOptions, app).listen(PORT, () => console.log(`JSON-LD validator app listening on port ${PORT}, with HTTPS.`));

} else {
  logger.info('Public folder : ' + public);

  app.listen(8081, () => console.log(`JSON-LD validator app listening on port ${8081}, with HTTP.`));
}
