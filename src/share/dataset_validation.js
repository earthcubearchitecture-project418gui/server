'use strict';

// const {
//   isIncludeDataCatalog,
//   isDistribution,
//   isProvider,
//   isPublisher,
//   isCreatorRole,
//   isSpatialCoverage,
//   isVariableMeasured
// } = require('./dataset_validators');

const { required, optional,
  isURL, isMimeType,
  isBoolean, isString, isStringArray,
  isCoord, isPolygon, isBox,
  isValidGeo
} = require('./validators.js');

const { walkObjAndVisit, mapScalarOrArray } = require('./funcs.js');

// ---------- Top Level

const datasetTopValidator = {
  '@id': required(isString),
  name: required(isString),
  alternateName: optional(isString),
  url: required(isURL),
  description: required(isString),
  version: optional(isString),
  isAccessibleForFree: required(isBoolean),
  keywords: required(isString),
  license: optional(isString),
  citation: optional(isString),
  includedInDataCatalog: optional(isIncludeDataCatalog),
  distribution: optional(isDistribution),
  provider: required(isProvider),
  publisher: required(isPublisher),
  creator: optional(isCreatorRole),
  spatialCoverage: optional(isSpatialCoverage),
  variableMeasured: optional(isVariableMeasured),
  measurementTechnique: optional(isStringArray)
}

function isValidDataset(input) {
  const validator = datasetTopValidator;
  const result = walkObjAndVisit(input, validator);
  return result;
}

// ---------- Children

//Object-less
function isIncludeDataCatalog(input) {
  return {
    '@id': required(isString)(input['@id'])
  };
}

const distributionValidator = {
  contentUrl: required(isURL),
  encodingFormat: required(isString)
}

function isDistribution(input) {
  return walkObjAndVisit(input, distributionValidator);
}

const providerValidator = {
  '@id': required(isString),
  legalName: required(isString),
  name: optional(isString),
  url: required(isURL)
}

function isProvider(input) {
  return walkObjAndVisit(input, providerValidator);
}

const publisherValidator = {
  '@id': required(isString),
  description: optional(isString),
  name: required(isString),
  url: required(isURL)
}

function isPublisher(input) {
  return walkObjAndVisit(input, providerValidator);
}

const variableMeasuredValidator = {
  '@id': required(isString),
  description: optional(isString),
  name: required(isString),
  unitText: required(isString),
  url: required(isURL)
}

function isVariableMeasured(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, variableMeasuredValidator));
}

const creatorRoleValidator = {
  '@id': required(isURL),
  roleName: optional(isString),
  url: optional(isURL),
  creator: required(isCreatorPerson)
}

function isCreatorRole(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, creatorRoleValidator));
}

const spatialCoverageValidator = {
  name: optional(isString),
  geo: required(isGeos)
}

function isSpatialCoverage(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, spatialCoverageValidator));
}

// ---------- Grandchildren

const creatorPersonValidator = {
  '@id': required(isString),
  name: required(isString),
  givenName: optional(isString),
  familyName: optional(isString),
  url: optional(isURL),
  identifier: required(isCreatorPersonIdentifier)
}

function isCreatorPerson(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, creatorPersonValidator));
}

//Currently not used, functionality in validators.js

// const geoCoordinates = {
//   latitude: required(isCoord),
//   longitude: required(isCoord),
//   elevation: required(isString)
// }

// const geoShape = {
//   box: isBox,
//   polygon: required(isPolygon)
// }

function isGeos(input) {
  const result = mapScalarOrArray(input, geo => {
    let geoResult = isValidGeo(geo);        //Maybe required(isValidGeo)
    if (geoResult !== true) {
      return geoResult;
    } else {
      return geoResult;
    }
  });

  return result;

}


// ---------- Great Grandchildren

const creatorPersonIdentifierValidator = {
  url: required(isURL),
  value: required(isString)
}

function isCreatorPersonIdentifier(input) {
  return walkObjAndVisit(input, creatorPersonIdentifierValidator);
}


module.exports = {
  isValidDataset,
}