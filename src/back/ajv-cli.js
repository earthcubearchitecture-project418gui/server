/// File is used with AJV-CLI to add custom formats before validation

const ajvUcar = require('../share/ajv-ucar.js');

// module.exports = function(ajv) {
//   ajvUcar.registerCustomFormats(ajv);
// };

module.exports = function(ajv) {
  ajvUcar.registerCustomFormats(ajv);
};
