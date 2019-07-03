const basicAuth = require('basic-auth');
const uuid = require('uuid/v1')
let AWS = require('aws-sdk');

const unAuthorized = res => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

  return res.sendStatus(401);
};

module.exports = (app, instanceConfiguration) => {

  AWS.config.update({region: instanceConfiguration.region});

  let dynamoDb = new AWS.DynamoDB.DocumentClient();

  api.post('/register', req => {
    let params = {
      TableName: instanceConfiguration.tableName,
      Item: {
        id: uuid(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
      }
    };

    return dynamoDb.put(params).promise();
  }, { success: 201 });

  api.get('/reports', (req, res) => {
    const user = basicAuth(req);

    if (!user || !user.uname || !user.pass) {
      unAuthorized(res);
    }

    if (user.uname === 'cloudfarmers' && user.pass === 'password') {
      return dynamoDb.scan({ TableName: instanceConfiguration.tableName }).promise()
        .then(response => response.Items);
    }
    else {
      unAuthorized(res);
    }
  });
};