
// import React, { Component } from "react";
// import { render } from "react-dom";
const React = require('react');
const { render } = require('react-dom');

// import Form from "react-jsonschema-form";
const { default: Form } = require('react-jsonschema-form');
// console.log('Form', Form);

// const testSchema = {
//   title: "Todo",
//   type: "object",
//   required: ["title"],
//   properties: {
//     title: { type: "string", title: "Title", default: "A new task" },
//     done: { type: "boolean", title: "Done?", default: false }
//   }
// };

const log = (type) => console.log.bind(console, type);

// render((
//   <Form schema={schema}
//     onChange={log("changed")}
//     onSubmit={log("submitted")}
//     onError={log("errors")} />
// ), document.getElementById("app"));

const uiSchema = {
  "spatialCoverage": {
    "items": {
      "geo": {
        "items": {
          "ui:field": (props) => {
            const { id, formData, classNames, label, help, required, description, errors, children } = props;
            console.log('[spatialCoverage.geo] UI Render : ', props);
            return React.createElement('input', {
              type: "text",
              className: "custom",
              value: props.value,
              required: props.required,
              onChange: (event) => props.onChange(event.target.value)
            },
              children);
          }
        }
      }
    }

  }
}

function example(schema, doc) {
  document.addEventListener('DOMContentLoaded', function () {
    render(
      React.createElement(
        Form, {
          schema: schema,
          uiSchema: uiSchema,
          formData: doc,
          onChange: log('changed'),
          onSubmit: log('submitted'),
          onError: log('errors')
        },
        null
      ),
      document.querySelector("#app")
    );

  });
}

module.exports = {
  example
}