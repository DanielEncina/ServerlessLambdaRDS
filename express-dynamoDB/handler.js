'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo con Express.js')
});

module.exports.generic = serverless(app);
