const express = require('express');
const router = express.Router();
const exercise = require('../models/exerciseModels');

//check the user is authenticated or not
function IsLoggedIn(req,res,next){
    if (req.isAuthenticated){
        console.log('Authenticated User');
        return next();
    }
    res.redirect('/login');
}
//Get
router.get('/', IsLoggedIn,function(req,res) {
    exercise.find({user:req.user},(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/indexExerciseTracker', { title: 'Exercise Tracker' ,user:req.user,dataset:exercise});}
    })
});
//Add
router.get('/add', IsLoggedIn,function(req, res) {
    exercise.find({user:req.user},(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/addExerciseTracker', { title: 'Exercise Tracker' ,user:req.user,dataset:exercise});}
    })
});
//edit
router.get('/edit/:_id', IsLoggedIn,function(req, res) {
    exercise.findById(req.params._id,(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/editExerciseTracker', { title: 'Exercise Tracker' ,user:req.user,exercisetracker:exercise});}
    })
});
//delete
router.get('/delete/:_id', IsLoggedIn,function(req, res) {
    exercise.remove({_id:req.params._id},(error => {
        if(error){console.log(error);}
        else{res.redirect('/exercisetracker');}
    }));
});

router.post('/add',IsLoggedIn,(req, res, next) => {
    exercise.create({
        exerciseName:req.body.exerciseName,
        duration: req.body.duration,
        caloriesBurnt: req.body.caloriesBurnt,
        date:req.body.date,
        user:req.user},
        (err)=> {
        if(err){console.log(err)}else{res.redirect('/exercisetracker')}
    });
});

router.post('/edit/:_id',IsLoggedIn,(req, res, next) => {
    exercise.findOneAndUpdate({_id:req.params._id},{
        exerciseName:req.body.exerciseName,
        duration: req.body.duration,
        caloriesBurnt: req.body.caloriesBurnt,
        date:req.body.date,
        user:req.user},
        (err)=> {
            if(err){console.log(err)}
            else{res.render('exerciseTracker/editExerciseTracker', { title: 'Exercise Tracker' ,user:req.user,dataset:exercise});}
    })
});

module.exports = router;