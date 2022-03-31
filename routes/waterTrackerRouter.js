const express = require('express');
const router = express.Router();
const waterEntries = require('../models/waterModels');

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

router.get('/', IsLoggedIn,function(req, res, next) {
    waterEntries.find({user:req.user},(err,waterTracked)=>{
        if(err){console.log(err);}
        else{res.render('waterTracker/indexWaterTracker', { title: 'Water Tracker' ,user:req.user,dataset:waterTracked});}
    })
});

/** Get Add Page **/
router.get('/add', IsLoggedIn,function(req, res, next) {
    waterEntries.find({user:req.user},(err,waterTracked)=>{
        if(err){console.log(err);}
        else{res.render('waterTracker/addWaterTracker', { title: 'Add a Water Item' ,user:req.user,dataset:waterTracked});}

    })
});

/** Get Edit Page **/
router.get('/edit/:_id', IsLoggedIn,function(req, res, next) {
    waterEntries.findById(req.params._id,(err,waterTracked)=>{
        if(err){console.log(err);}
        else{res.render('waterTracker/editWaterTracker', { title: 'Update a Water Item' ,user:req.user,waterItem:waterTracked});}
    })
});

/** Delete Handler **/
router.get('/delete/:_id',IsLoggedIn,function (req,res,next){
    waterEntries.remove({_id:req.params._id},(error => {
        if(error){console.log(error);}else {res.redirect('/waterTracker');}
    }));
});

/**-------------------------
 * Post Routes
 ---------------------------*/

router.post('/add',IsLoggedIn,(req, res, next) => {
    waterEntries.create({
            typeOfLiquid: req.body.typeOfLiquid,
            yourCurrentWeight: req.body.yourCurrentWeight,
            intakeAmount: req.body.intakeAmount,
            date: req.body.date,
            intakeTimeOfDay: req.body.intakeTimeOfDay,
            intakeTime: req.body.intakeTime,
            user:req.user},
        (err)=> {
            if(err){console.log(err)}else{res.redirect('/waterTracker')}
        });
});

router.post('/edit/:_id',IsLoggedIn,(req, res, next) => {
    waterEntries.findOneAndUpdate({_id:req.params._id},{
            typeOfLiquid: req.body.typeOfLiquid,
            yourCurrentWeight: req.body.yourCurrentWeight,
            intakeAmount: req.body.intakeAmount,
            date: req.body.date,
            intakeTimeOfDay: req.body.intakeTimeOfDay,
            intakeTime: req.body.intakeTime,
            user:req.user},
        (err)=> {
            if(err){console.log(err)}else{res.redirect('/waterTracker')}
        })
});

module.exports =router;