const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const passport = require('passport');


function IsLoggedIn(req,res,next){
  if (req.isAuthenticated){
    console.log('Authenticated User');
    return next();
  }
  res.redirect('/login');
}

function checkConfirmPassword(req,res,next){
  let password = req.body.password;
  let confirm = req.body.confirmPWD;
  if(password===confirm){
    return next();
  }
  else{
    res.render('register',{title:'Create a new Account',message:'Password and Confirm Fields must Match'});
  }

}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Life Reframed' ,user:req.user});
});
// GET handler for /login
router.get('/login', (req, res, next) => {
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
  successRedirect: '/user',
  failureRedirect: '/login',
  failureMessage: 'Invalid credentials'
}));

// GET handler for /register
router.get('/register',  (req, res, next) => {
  // Obtain messages if any
  let messages = req.session.messages || [];
  // Pass messages to view
  console.log(messages);
  res.render('register', { title: 'Create a new account',messages:messages });
});



//POST handler for /register
router.post('/register',checkConfirmPassword, (req, res, next) => {
  // Create a new user based on the information from the page
  User.register(new User({
        username: req.body.username,
        Personals: {
          name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }
        }
      }),
      req.body.password,
      (err, newUser) => {
        if (err) {
          console.log(err);
          // take user back and reload register page
          console.log("Didn't Work");
          res.redirect('/register');
        } else {
          // log user in
          req.login(newUser, (err) => {
            res.redirect('/user');
          });
        }
      })
});

// GET handler for logout
router.get('/logout', (req, res, next) => {
  // log the user out using the request object
  req.logout();
  // redirect to login page
  res.redirect('/login');
});

module.exports = router;
