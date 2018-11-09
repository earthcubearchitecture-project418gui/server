const { required, isString } = require('../validators/validators');


function isIncludeDataCatalog(input) {
  console.log('[isIncludeDataCatalog] input : ', input);

  return {
    '@id': required(isString)(input['@id'])
  };
}

function isDistribution(input) { return true; }
function isProvider(input) { return true; }
function isPublisher(input) { return true; }
function isCreatorRole(input) { return true; }
function isSpatialCoverage(input) { return true; }
function isVariableMeasured(input) { return true; }

module.exports = {
  isIncludeDataCatalog,
  isDistribution,
  isProvider,
  isPublisher,
  isCreatorRole,
  isSpatialCoverage,
  isVariableMeasured
}