var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./strategies/userStrategy');

//require routers
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// create session and tell app to use it
app.use(session({
  secret: 'my secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxage: 600000, secure: false}
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use('/', indexRouter);
app.use('/register', registerRouter);

// server port set and listen
var serverPort = process.env.port || 3000;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});

// connect to the mongodb
var mongoURI = "mongodb://localhost:27017/tauPassportDB";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
