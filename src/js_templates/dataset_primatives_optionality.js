
// values (true) currently have no meaning
const datasetPrimativeOptionality = {

  '@id': true,
  name: true,
  url: true,
  description: true,
  isAccessibleForFree: true,
  keywords: true,
  includedInDataCatalog: [{ '@id': true }],
  distribution: [{ contentUrl: true, encodingFormat: true }],
  provider:
  {
    '@id': true,
    legalName: true,
    url: true
  },
  publisher:
  {
    '@id': true,
    name: true,
    url: true
  },
  creator: [{
    '@id': true,
    creator:
    {
      '@id': true,
      name: true,
      identifier: {
        url: true,
        value: true
      }
    }
  }],
  variableMeasured: [{
    '@id': true,
    name: true,
    unitText: true
    // url: true      Not specified
  }],

  // measurementTechnique: true,   Not specified

  // spatialCoverage: [{ }]   Requires higher level verification

};


module.exports = {
  datasetPrimativeOptionality
}