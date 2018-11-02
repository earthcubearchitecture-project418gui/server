const { isURL } = require('validator');

// Currently does not validate '@context'
const primativeValidator = {
  '@type': isStringArray,
  '@id': isString,
  legalName: isString,
  name: isString,
  url: isURL,
  description: isString,
  category: isStringArray,
  sameAs: isStringArray,
  contactPoint: {
    '@type': isString,
    '@id': isString,
    name: isString,
    email: isString,
    url: isString,
    contactType: isString
  },
  address: {
    '@type': isString,
    streetAddress: isString,
    addressLocality: isString,
    addressRegion: isString,
    postalCode: isString,
    addressCountry: isString
  },
  foundingDate: isString,
  logo: { '@type': isString, url: isString },
  parentOrganization: {
    '@type': isString,
    '@id': isString,
    legalName: isString,
    name: isString,
    url: isString,
    address: {
      '@type': isString,
      streetAddress: isString,
      addressLocality: isString,
      addressRegion: isString,
      postalCode: isString,
      addressCountry: isString
    }
  },
  memberOf: {
    '@type': isString,
    programName: isString,
    hostingOrganization: { '@type': isString, name: isString, url: isString }
  },
  funder: {
    '@type': isString,
    '@id': isString,
    legalName: isString,
    name: isString,
    url: isString,
    identifier: { '@type': isString, propertyID: isString, value: isString, url: isString },
    publishingPrinciples: isStringArray
  }
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
  primativeValidator
}

