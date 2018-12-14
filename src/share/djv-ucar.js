
const djv = require('djv');

const { isPolygon, isBox, isMimeType } = require('./validators.js');

const STANDARD = {
  version: 'draft-06'
};

function validator(opts) {
  const env = new djv(Object.assign({}, STANDARD, opts));
  // registerCustomFormats(env);
  return {
    validate,
    env
  };
}

function validate(schema, doc) {
  const { env } = this;
  env.addSchema('temp', schema);
  const result = env.validate('temp', doc);
  env.removeSchema('temp');

  return result;
}

function registerCustomFormats(env) {
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
    env.addFormat(customFormat.format, (data, tpl) => {
      const res = customFormat.validator(data);
      if (res !== true) {
        additionalErrors.push(res);
      }
      return res === true;
    });
  });
}

module.exports = validator;
