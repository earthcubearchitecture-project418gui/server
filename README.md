### UCAR JSON-LD Validation

#### Project structure

node.jsonld.service | Linux systemD file
PROCFILE            | For Heroku

.
├── src                           | All Javascript
│   ├── back                      | Server code
│   │   ├── web.js                | Initial Express setup, middleware, server launch
│   │   ├── routes.js             | HTTP End-points
│   │   ├── ajv-cli.js            | Setup script for use with AJV-CLI
│   │   └── logging.js            | Setup script for program-wide logging, used by all other .js
│   ├── front                     | Example code for browser, currently nothing important
│   ├── schema                    | Definitive versions of JSON schemas
│   └── share                     | Portable code
│       ├── ajv-ucar.js           | Setup script for use with AJV, adds custom formats
│       ├── ericsmimetypelist.js  | List from eric, used by validator.
│       ├── validators.js         | Implements custom validators, layer above validator library
│       └── jsonld_examples       | Local copy of UCAR Github repo, modified
├── ssl                           | Default location, not under VCS
└── public                        | Serve location, not under VCS

#### Usage

From package.json, npm run ...:
- web               | Deployed operation
- web:unsecure      | Development operation
- test: ...         | Validates schema using AJV-CLI
