const ajvUcar = require('../share/ajv-ucar.js');

module.exports = function(ajv) {
  ajvUcar.registerCustomFormats(ajv);
};
