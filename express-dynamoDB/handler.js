'use strict';
const serverless = require('serverless-http');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const dynameDB = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hola mundo con Express.js')
});

app.post('/users', (req, res) => {
  const { userId, name } = req.body;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name
    }
  };

  dynameDB.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        error: 'No se ha podido crear el usuario'
      });
    } else {
      res.json({userId, name});
    }
  })
});

app.get('/users', (req, res) => {
  const params = {
    TableName: USERS_TABLE
  };

  dynameDB.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        error: 'No se ha podido acceder a los usuarios'
      });
    } else {
      const { Items } = result;
      res.json({
        success: true,
        message: 'Usuarios cargados correctamente',
        users: Items
      });
    }
  })
});

app.get('/users/:userId', (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    }
  };

  dynameDB.get(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: 'No se ha podido acceder al usuario'
      });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      return res.json({ userId, name });
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });

    }
  })
});

module.exports.generic = serverless(app);
