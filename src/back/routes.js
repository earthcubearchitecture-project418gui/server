const path = require('path');
const fs = require('fs');
const express = require('express');

const { zip } = require('ramda');

const ajv = require('../share/ajv-ucar.js');

module.exports = function (publicFolder) {
  const router = express.Router();

  router.use(express.json());
  router.use((err, req, res, next) => {
    if (err) {
      if (res.headersSent) {
        return next(err);
      }
      res.status(400);
      res.send(err.message);
      return next(err);
    }
    next();
  });
  
  // -------------------------------------
  // @route   POST api/validate_ajv
  // @desc    Validates input json with custom validator
  router.post('/validate_ajv', (req, res) => {
    const {schema, doc} = req.body;
    console.log(req.body);
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
  ///         Uses locally stored schema files in publicFolder
  (function (publicFolder) {
    const names = ['dataset', 'organizations'];
    const files = names.map(n => n + '.json');
    const fullpath = files.map(filename => path.join('.', publicFolder, filename));
    
    const schemas = {};
    zip(names, fullpath)
      .filter(([_, fullpath]) => fs.existsSync(fullpath))
      .map(([name, fullpath]) => schemas[name] = JSON.parse(fs.readFileSync(fullpath, { encoding: 'utf-8' })) );
    
    console.log(schemas);
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
  })(publicFolder);
  
  return router;
}




