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

const { required,
  isURL, isMimeType,
  isBoolean, isString, isStringArray,
  isCoord, isPolygon, isBox,
  isValidGeo
} = require('../validators/validators');

const { walkObjAndVisit, mapScalarOrArray } = require('../funcs');


// ---------- Top Level

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
  measurementTechnique: isStringArray
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
  name: isString,
  url: required(isURL)
}

function isProvider(input) {
  return walkObjAndVisit(input, providerValidator);
}

const publisherValidator = {
  '@id': required(isString),
  description: isString,
  name: required(isString),
  url: required(isURL)
}

function isPublisher(input) {
  return walkObjAndVisit(input, providerValidator);
}

const variableMeasuredValidator = {
  '@id': required(isString),
  description: isString,
  name: required(isString),
  unitText: required(isString),
  url: required(isURL)
}

function isVariableMeasured(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, variableMeasuredValidator));
}

const creatorRoleValidator = {
  '@id': required(isURL),
  roleName: isString,
  url: isURL,
  creator: required(isCreatorPerson)
}

function isCreatorRole(input) {
  return mapScalarOrArray(input, o => walkObjAndVisit(o, creatorRoleValidator));
}

const spatialCoverageValidator = {
  name: isString,
  geo: required(isGeos)
}

function isSpatialCoverage(input) {
  // const result = {
  //   'name': isString(input['name'])
  // };

  // console.log('[isSpatialCoverage] :', input);
  // result['geosAreValid'] = required(isGeos)(input.geo);
  return mapScalarOrArray(input, o => walkObjAndVisit(o, spatialCoverageValidator));
}


// ---------- Grandchildren


const creatorPersonValidator = {
  '@id': required(isString),
  name: required(isString),
  givenName: isString,
  familyName: isString,
  url: isURL,
  identifier: isCreatorPersonIdentifier
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
  value: isString
}

function isCreatorPersonIdentifier(input) {
  return walkObjAndVisit(input, creatorPersonIdentifierValidator);
}


module.exports = {
  isValidDataset,
}