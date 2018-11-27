const express = require('express');
const router = express.Router();

const ajv = require('../share/ajv-ucar.js');

const { isValidDataset } = require('../share/dataset_validation.js');

router.use(express.json());
router.use((err, req, res, next) => {
  if (err) {
    // console.error('JSON error :', err);
    // console.error('keys : ', Object.keys(err));
    if (res.headersSent) {
      return next(err);
    }
    res.status(400)
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
// @route   POST api/validate_dataset
// @desc    Validates input json with custom validator
router.post('/validate_dataset', (req, res) => {
  console.log('Hit [/validate_dataset]');
  
  let inputDocument = req.body;
  // console.log(req.body);

  const result = isValidDataset(inputDocument);
  // const result_string = JSON.stringify(result, undefined, 2);

  // console.log(result_string);
  res.send(result);
});


// @route   DELETE api/posts/:id
// @desc    Delete post
router.post('/validate_org', (req, res) => {
  console.log('Hit [/validate_org]');
  res.status(503).send('Service unavailable');

  // const result = validateOrganizationDocument(req.body, datasetPrimativesValidator, {});
  // const result_string = JSON.stringify(result, undefined, 2);

  // console.log(result_string);
  // res.send(result_string);
});

module.exports = router;