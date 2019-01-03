// Wrapper around ajv, for custom error reporting


const AJV = require('ajv');
let ajv = new AJV({ allErrors: true });

const { isPolygon, isBox, isRestrictedMimeType } = require('./validators.js');

let currentValidator;

registerCustomFormats(ajv);

module.exports = {
  compile,
  errors,

  registerCustomFormats
};

function newAJV() {
  const ajv = new AJV({ allErrors: true });
  registerCustomFormats(ajv);
  return ajv;
}


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
      validator: isRestrictedMimeType
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
  ajv = newAJV();
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
