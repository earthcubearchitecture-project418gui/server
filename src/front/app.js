const schema = require('../schema/dataset.json');
const exampleDoc = require('../share/jsonld_examples/datasets/bcodmo_dataset.json');

const Ajv = require('ajv')

var ajv = new Ajv({ allErrors: true });
var validator = ajv.compile(schema);
var valid = validator(exampleDoc);

if (!valid) {
  console.log('Errors');
  console.log(validator.errors);
} else {
  console.log('Valid!');
}


// import React, { Component } from "react";
// import { render } from "react-dom";
const React = require('react');
const { render } = require('react-dom');

// import Form from "react-jsonschema-form";
const { default: Form } = require('react-jsonschema-form');
console.log('Form', Form);

const testSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false }
  }
};

const log = (type) => console.log.bind(console, type);

// render((
//   <Form schema={schema}
//     onChange={log("changed")}
//     onSubmit={log("submitted")}
//     onError={log("errors")} />
// ), document.getElementById("app"));

document.addEventListener('DOMContentLoaded', function () {
  render(
    React.createElement(
      Form, {
        schema: schema,
        onChange: log('changed'),
        onSubmit: log('submitted'),
        onError: log('errors')
      },
      null
    ),
    document.querySelector("#app")
  );

});


