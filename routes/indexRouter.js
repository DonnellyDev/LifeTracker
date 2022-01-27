const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Life Reframed' ,user:req.user});
});
// GET handler for /login
router.get('/login', (req, res, next) => {
  // res.render('login', { title: 'Login' });
  // Obtain messages if any
  let messages = req.session.messages || [];
  // Clear messages
  req.session.messages = [];
  // Pass messages to view
  res.render('login', { title: 'Login', messages: messages });
});

// POST handler for /login
// Syntax will be a bit different since login will be handled by passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: 'Invalid credentials'
}));

// GET handler for /register
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Create a new account' });
});

//POST handler for /register
router.post('/register', (req, res, next) => {
  // Create a new user based on the information from the page
  User.register(new User({
        username: req.body.username
      }),
      req.body.password,
      (err, newUser) => {
        if (err) {
          console.log(err);
          // take user back and reload register page
          return res.redirect('/register');
        }
        else {
          // log user in
          req.login(newUser, (err) => {
            res.redirect('/');
          });
        }
      });
});

// GET handler for logout
router.get('/logout', (req, res, next) => {
  // log the user out using the request object
  req.logout();
  // redirect to login page
  res.redirect('/login');
});

module.exports = router;
