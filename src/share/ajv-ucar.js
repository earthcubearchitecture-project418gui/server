
const AJV = require('ajv');
const ajv = new AJV({ allErrors: true });

const { isPolygon, isBox, isMimeType } = require('./validators.js');


let currentValidator;

registerCustomFormats(ajv);

// module.exports = ajv;

module.exports = {
  compile,
  errors,

  registerCustomFormats
};

let additionalErrors = [];

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

function compile(schema) {
  currentValidator = ajv.compile(schema);
  additionalErrors = [];
  return currentValidator;
};

function errors() {
  return {
    errors: currentValidator.errors,
    additionalErrors
  };
}
