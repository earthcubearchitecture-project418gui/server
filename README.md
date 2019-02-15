### UCAR JSON-LD Validation

#### Project structure

node.jsonld.service | Linux systemD file
PROCFILE            | For Heroku

.
├── src          | All Javascript
│   ├── back     | Server code
│   ├── front    | Example code for browser
│   ├── schema   | Definitive versions of JSON schemas
│   └── share    | Portable code
├── ssl          | Default location, not under VCS
└── public       | Serve location, not under VCS

#### Usage

From package.json, npm run ...:
- web               | Deployed operation
- web:unsecure      | Development operation
- test: ...         | Validates schema using AJV-CLI
