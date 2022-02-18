const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const FoodEntries = require('../models/foodModels');
const passport = require('passport');


function IsLoggedIn(req,res,next){
    if (req.isAuthenticated){
        console.log('Authenticated User');
        return next();
    }
    res.redirect('/login');
}

/** GET home page. **/
router.get('/', IsLoggedIn,function(req, res, next) {
    FoodEntries.find({user:req.user},(err,foodTracked)=>{
        if(err){console.log(err);}
        else{res.render('foodTracker/indexFoodTracker', { title: 'Food Tracker' ,user:req.user,dataset:foodTracked});}
    })
});

/** Get Add Page **/
router.get('/add', IsLoggedIn,function(req, res, next) {
    FoodEntries.find({user:req.user},(err,foodTracked)=>{
        if(err){console.log(err);}
        else{res.render('foodTracker/indexFoodTracker', { title: 'Food Tracker' ,user:req.user,dataset:foodTracked});}
    })
});

/** Get Edit Page **/
router.get('/edit/:_id', IsLoggedIn,function(req, res, next) {
    FoodEntries.findById(req.params._id,(err,foodTracked)=>{
        if(err){console.log(err);}
        else{res.render('foodTracker/indexFoodTracker', { title: 'Food Tracker' ,user:req.user,dataset:foodTracked});}
    })
});






module.exports =router;