'use strict';
const queryString = require('querystring');

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hola waxop ${event.pathParameters.name}`,
      input: event.name,
    }),
  };
};

module.exports.showUser = async (event, context) => {
  const body = queryString.parse(event['body']);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Peticion POST`,
      input: `Hola ${body.name} ${body.lastname}`,
    }),
  };
};
