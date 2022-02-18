//We do not need .env file
require('dotenv').config()

// Just checking
const createError = require('http-errors');


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// const config = require('./config/globals');

// Router Objects
const indexRouter = require('./routes/indexRouter');
const foodTrackerRouter = require('./routes/foodTrackerRouter');

// Passport Modules
const passport =require('passport');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure passport module https://www.npmjs.com/package/express-session
// secret is a salt value used for hashing
// save forces the session to be saved back to the session store
// even if it's never modified during the request
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Link Passport to Users Model
const User = require('./models/userModels');
passport.use(User.createStrategy());

// Set passport to w/r users to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routers
app.use('/', indexRouter);
app.use('/foodTracker',foodTrackerRouter);
//
var connectionString = process.env.DB_CONN;

mongoose.connect(connectionString , {useNewUrlParser: true, useUnifiedTopology: true })
    .then((message) => {
  console.log('Connected successfully!');
})
    .catch((error) => {
      console.log(`Error while connecting! ${error}`);
    });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
