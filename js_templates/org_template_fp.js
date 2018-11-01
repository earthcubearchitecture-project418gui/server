


const template = {
  '@type': false,
  '@id': false,
  legalName: false,
  name: false,
  url: false,
  description: false,
  category: false,
  sameAs: false,
  contactPoint: {
    '@type': false,
    '@id': false,
    name: false,
    email: false,
    url: false,
    contactType: false
  },
  address: {
    '@type': false,
    streetAddress: false,
    addressLocality: false,
    addressRegion: false,
    postalCode: false,
    addressCountry: false
  },
  foundingDate: false,
  logo: { '@type': false, url: false },
  parentOrganization: {
    '@type': false,
    '@id': false,
    legalName: false,
    name: false,
    url: false,
    address: {
      '@type': false,
      streetAddress: false,
      addressLocality: false,
      addressRegion: false,
      postalCode: false,
      addressCountry: false
    }
  },
  memberOf: {
    '@type': false,
    programName: false,
    hostingOrganization: { '@type': false, name: false, url: false }
  },
  funder: {
    '@type': false,
    '@id': false,
    legalName: false,
    name: false,
    url: false,
    identifier: { '@type': false, propertyID: false, value: false, url: false },
    publishingPrinciples: false
  }
};



