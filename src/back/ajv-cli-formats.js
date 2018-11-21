const Ajv = require('ajv')
const { registerCustomFormats } = require('../share/ajv-formats.js');

module.exports = function ajvCustomFormats(ajv) {
  registerCustomFormats(ajv);
}
