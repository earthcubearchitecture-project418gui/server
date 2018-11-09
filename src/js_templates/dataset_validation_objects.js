const {
  isIncludeDataCatalog,
  isDistribution,
  isProvider,
  isPublisher,
  isCreatorRole,
  isSpatialCoverage,
  isVariableMeasured
} = require('./dataset_validators');

const { required,
  isURL, isMimeType,
  isBoolean, isString, isStringArray,
  isCoord, isPolygon, isBox
} = require('../validators/validators');


// Top Level



const datasetTopValidator = {
  '@id': required(isString),
  name: required(isString),
  alternateName: isString,
  url: required(isURL),
  description: required(isString),
  version: isString,
  isAccessibleForFree: required(isBoolean),
  keywords: required(isString),
  license: isString,
  citation: isString,
  includedInDataCatalog: isIncludeDataCatalog,
  distribution: isDistribution,
  provider: isProvider,
  publisher: isPublisher,
  creator: isCreatorRole,
  spatialCoverage: isSpatialCoverage,
  variableMeasured: isVariableMeasured,
  measurementTechnique: isString
}

//children

const datasetDistribution = {
  contentUrl: isURL,
  encodingFormate: isString
}

module.exports = {
  datasetTopValidator,
  datasetDistribution
}