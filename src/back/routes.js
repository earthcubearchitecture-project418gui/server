const path = require('path');
const fs = require('fs');

const express = require('express');
const { zip } = require('ramda');
const logger = require('./logging.js');

const ajv = require('../share/ajv-ucar.js');

module.exports = function (schemaFolder) {
  const router = express.Router();

  router.use(express.json());
  router.use((err, req, res, next) => {
    if (err) {
      logger.info('Inbound JSON error - ' + err.message);
      logger.debug('Inbound JSON error - ' + err.body);
      if (res.headersSent) {
        return;
      }
      res.status(400);
      res.end(err.message);
      return;
    }
    next();
  });
  
  // -------------------------------------
  // @route   POST api/validate_ajv
  // @desc    Validates input json with custom validator
  router.post('/validate_ajv', (req, res) => {
    const {schema, doc} = req.body;
    // console.log(req.body); 
    const validator = ajv.compile(schema);
    let valid = validator(doc);
  
    res.status(200);
    res.send({
      ...ajv.errors(),
      valid
    });
  });


  // -------------------------------------
  // @route   POST api/validate_standard
  // @desc    Validates input json with custom validator
  // /         Uses locally stored schema files in schemaFolder
  (function (schemaFolder) {
    const names = ['dataset', 'organizations'];
    const files = names.map(n => n + '.json');
    const fullpath = files.map(filename => path.join(schemaFolder, filename));
    
    const schemas = {};
    zip(names, fullpath)
      .filter(([_, fullpath]) => fs.existsSync(fullpath))
      .map(([name, fullpath]) => schemas[name] = JSON.parse(fs.readFileSync(fullpath, { encoding: 'utf-8' })) );
    
    router.post('/validate_standard', (req, res) => {
      const {schema, doc} = req.body;
      const validator = ajv.compile(schemas[schema]);

      let valid = validator(doc);
      res.status(200);
      res.send({
        ...ajv.errors(),
        valid
      });
    });
  })(schemaFolder);

  
  
  return router;
}




