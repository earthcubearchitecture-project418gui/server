
const { isURL, isMimeType,
  isBoolean, isString, isStringArray,
  isCoord, isPolygon, isBox
} = require('../validators/validators');


// Validates primatives at the ends of the structure
// Currently does not validate '@context'
const datasetPrimativesValidator = {

  '@type': isString,
  '@id': isString,
  additionalType: isStringArray,
  name: isString,
  alternateName: isString,
  url: isURL,
  description: isString,
  version: isString,
  isAccessibleForFree: isBoolean,
  keywords: isString,
  license: isString,
  citation: isString,
  includedInDataCatalog: [{ '@id': isString }],
  distribution: [{ '@type': isString, contentUrl: isURL, encodingFormat: isMimeType }],
  provider:
  {
    '@id': isString,
    '@type': isString,
    additionalType: isString,
    legalName: isString,
    name: isString,
    url: isURL
  },
  publisher:
  {
    '@id': isString,
    '@type': isString,
    description: isString,
    name: isString,
    url: isURL
  },
  creator: [{
    '@id': isString,
    '@type': isString,
    additionalType: isString,
    roleName: isString,
    url: isURL,
    creator:
    {
      '@id': isString,
      '@type': isString,
      additionalType: isString,
      name: isString,
      givenName: isString,
      familyName: isString,
      url: isURL,
      identifier: {
        '@type': isString,
        additionalType: isString,
        propertyID: isString,
        url: isURL,
        value: isString
      }
    }
  }],
  variableMeasured: [{
    '@type': isString,
    '@id': isString,
    description: isString,
    name: isString,
    unitText: isString,
    url: isURL
  }],

  measurementTechnique: isStringArray,

  spatialCoverage: [{
    '@type': isString,
    name: isString,
    subject: {
      '@type': isString,
      fileFormat: isString,
      text: isString
    },
    additionalProperty: [{
      "@type": isString,
      value: isString,
      propertyID: isString,
      name: isString,
      alternateName: isString
    }],
    geo: [{
      '@type': isString,
      latitude: isCoord,
      longitude: isCoord,
      box: isBox,
      polygon: isPolygon
    }]
  }]

};

//Validators
module.exports = {
  datasetPrimativesValidator
}

