

function isRequired(isPresent) {
  if (typeof isPresent === 'string') {
    return "Required property is invalid > " + isPresent;
  }
  return isPresent || "Required property is missing";

}
// values (true) currently have no meaning
const datasetPrimativeOptionality = {

  '@id': isRequired,
  name: isRequired,
  url: isRequired,
  description: isRequired,
  isAccessibleForFree: isRequired,
  keywords: isRequired,
  includedInDataCatalog: [{ '@id': isRequired }],
  distribution: [{ contentUrl: isRequired, encodingFormat: isRequired }],
  provider:
  {
    '@id': isRequired,
    legalName: isRequired,
    url: isRequired
  },
  publisher:
  {
    '@id': isRequired,
    name: isRequired,
    url: isRequired
  },
  creator: [{
    '@id': isRequired,
    creator:
    {
      '@id': isRequired,
      name: isRequired,
      identifier: {
        url: isRequired,
        value: isRequired
      }
    }
  }],
  variableMeasured: [{
    '@id': isRequired,
    name: isRequired,
    unitText: isRequired
    // url: true      Not specified
  }],

  // measurementTechnique: true,   Not specified

  // spatialCoverage: [{ }]   Requires higher level verification

};


module.exports = {
  datasetPrimativeOptionality
}