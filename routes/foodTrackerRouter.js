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

/**------------------
 * Get Routes
 ---------------------------*/

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
        else{res.render('foodTracker/addFoodTracker', { title: 'Add a Food Item' ,user:req.user,dataset:foodTracked});}
    })
});

/** Get Edit Page **/
router.get('/edit/:_id', IsLoggedIn,function(req, res, next) {
    FoodEntries.findById(req.params._id,(err,foodTracked)=>{
        if(err){console.log(err);}
        else{res.render('foodTracker/indexFoodTracker', { title: 'Food Tracker' ,user:req.user,dataset:foodTracked});}
    })
});

/**-------------------------
 * Post Routes
 ---------------------------*/


router.post('/add',IsLoggedIn,(req, res, next) => {
    FoodEntries.create({
        name:req.body.name,
        mealTime: req.body.mealTime,
        mealType: req.body.mealType,
        description:req.body.descriptionFood,
        date:req.body.eatenDate,
        user:req.user},
        (err)=> {
        if(err){console.log(err)}else{res.redirect('/foodTracker')}
    });
});



module.exports =router;