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

router.get('/', IsLoggedIn,(req, res, next) =>{
    User.find({user:req.user},(err,user)=> {
        if (err) {
            console.log(err);
        } else {
            res.render('userDashboard/userIndex', {title: "Dashboard", user: req.user, dataset: user});
        }
    })
} )


module.exports = router;