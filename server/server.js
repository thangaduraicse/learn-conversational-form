const path = require('path'),
      express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser');

const AWSRoutes = require('./aws');

let instanceConfiguration = {
  port: process.env.PORT || 8080,
  tableName: process.env.DYNAMODB_TABLE_NAME || 'cloudfarmers',
  region: process.env.AWS_REGION || 'ap-south-1'
};

console.log('Instance configuration ...', JSON.stringify(instanceConfiguration));

// Create express server
let app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// Configure express session
app.use(session({
  secret: 'cloud farmers demo app',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configure body parser to read body data in the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configure cookie parser to set cookie in browser
app.use(cookieParser());

// Include all AWS Routes
AWSRoutes(app, instanceConfiguration);

// Serve the static content
app.use(express.static('content'));

// Start and listen the port
app.listen(instanceConfiguration.port, () => {
  console.log('Server is up and happy to deliver the content!');
});
