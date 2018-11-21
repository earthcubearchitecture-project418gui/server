const Ajv = require('ajv')
const { addFormatsToAJV, registerCustomFormats } = require('../share/ajv-formats.js');

module.exports = function ajvCustomFormats(ajv) {
  registerCustomFormats(ajv);
}

// module.exports = ajvCustomFormats;