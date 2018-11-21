
const AJV = require('ajv');
const ajv = new AJV({ allErrors: true });

const { isPolygon, isBox, isMimeType } = require('./validators.js');

let additionalErrors = [];

let currentValidator;

registerCustomFormats(ajv);

module.exports = {
  compile,
  errors,

  registerCustomFormats
};

function registerCustomFormats(ajv) {
  [
    {
      format: "polygon",
      validator: isPolygon
    },
    {
      format: "box",
      validator: isBox
    },
    {
      format: "MimeType",
      validator: isMimeType
    }
  ].forEach(customFormat => {
    ajv.addFormat(customFormat.format, (data) => {
      const res = customFormat.validator(data);
      if (res !== true) {
        additionalErrors.push(res);
      }
      return res === true;
    });
  });
}

function compile(...args) {
  currentValidator = ajv.compile(...args);
  additionalErrors = [];
  return currentValidator;
};

function errors() {
  return {
    errors: currentValidator.errors,
    additionalErrors
  };
}
