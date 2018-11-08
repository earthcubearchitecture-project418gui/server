
const {
  isGeos
} = require('../validators/validators');


// Validates primatives at the ends of the structure
// Currently does not validate '@context'
const datasetStage2Validator = {

  spatialCoverage: [{

    geo: isGeos
  }]

};

//Validators
module.exports = {
  datasetStage2Validator
}

