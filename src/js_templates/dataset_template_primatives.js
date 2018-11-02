const { isURL } = require('validator');
const { anyPass, allPass } = require('ramda');

// Validates primatives at the ends of the structure
// Currently does not validate '@context'
const datasetPrimativesValidator = {

  '@type': isString,
  '@id': isString,
  additionalType: isString,
  name: isString,
  alternateName: isString,
  url: isString,
  description: isString,
  version: isString,
  isAccessibleForFree: isString,
  keywords: isString,
  license: isString,
  citation: isString,
  includedInDataCatalog: [{ '@id': isString }],
  distribution: [{ '@type': isString, contentUrl: isString, encodingFormat: isString }],
  provider:
  {
    '@id': isString,
    '@type': isString,
    additionalType: isString,
    legalName: isString,
    name: isString,
    url: isString
  },
  publisher:
  {
    '@id': isString,
    '@type': isString,
    description: isString,
    name: isString,
    url: isString
  },
  creator: [{
    '@id': isString,
    '@type': isString,
    additionalType: isString,
    roleName: isString,
    url: isString,
    creator:
    {
      '@id': isString,
      '@type': isString,
      additionalType: isString,
      name: isString,
      givenName: isString,
      familyName: isString,
      url: isString,
      identifier: {
        '@type': isString,
        additionalType: isString,
        propertyID: isString,
        url: isString,
        value: isString
      }
    }
  }],
  spatialCoverage: isString,
  variableMeasured: [{
    '@type': isString,
    '@id': isString,
    description: isString,
    name: isString,
    unitText: isString,
    url: isString
  }],
  measurementTechnique: anyPass([isString, isStringArray]),

  spatialCoverage: [{
    '@type': isString,
    name: isString,
    geo: {
      '@type': isString,
      latitude: isString,
      longitude: isString
    }
  }]

};

//Validators

function isString(input) {
  return typeof input === 'string';
}

function isStringArray(input) {
  if (!Array.isArray(input)) {
    return false;
  }
  for (const v of input) {
    if (!isString(v)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  datasetPrimativesValidator
}

