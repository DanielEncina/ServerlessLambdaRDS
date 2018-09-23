const connection = require('../connection.js');
const queryString = require('querystring');

module.exports.findAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'SELECT * FROM todos';
  connection.query(sql, (error, rows) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          todos: rows
        })
      });
    }
  });
};

module.exports.findOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'SELECT * FROM todos WHERE id = ?';
  connection.query(sql, [event.pathParameters.todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          todos: row
        })
      });
    }
  });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = queryString.parse(event['body']);
  const data = {
    todo: body.todo
  };

  const sql = 'INSERT INTO todos SET ?';
  connection.query(sql, [data], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo insertado correctamente con id ${result.insertId}`
        })
      });
    }
  });
};
