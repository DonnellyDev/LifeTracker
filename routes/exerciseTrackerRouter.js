const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const exercise = require('../models/exerciseModels');

//check the user is authenticated or not
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

router.get('/', IsLoggedIn,function(req,res) {
    exercise.find({user:req.user},(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/indexExerciseTracker', { title: 'Exercise Tracker' ,user:req.user,dataset:exercise});}
    })
});

/** Get Add Page **/
router.get('/add', IsLoggedIn,function(req, res) {
    exercise.find({user:req.user},(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/addExerciseTracker', { title: 'Add a New Exercise' ,user:req.user,dataset:exercise});}
    })
});

/** Get Edit Page **/
router.get('/edit/:_id', IsLoggedIn,function(req, res) {
    exercise.findById(req.params._id,(err,exercise)=>{
        if(err){console.log(err);}
        else{res.render('exerciseTracker/editExerciseTracker', { title: 'Update an Exercise' ,user:req.user,exercisetracker:exercise});}
    })
});

/** Delete Handler **/
router.get('/delete/:_id', IsLoggedIn,function(req, res) {
    exercise.remove({_id:req.params._id},(error => {
        if(error){console.log(error);}
        else{res.redirect('/exerciseTracker');}
    }));
});

/**-------------------------
 * Post Routes
 ---------------------------*/

router.post('/add',IsLoggedIn,(req, res, next) => {
    exercise.create({
        exerciseName:req.body.exerciseName,
        duration: req.body.duration,
        caloriesBurnt: req.body.caloriesBurnt,
        date:req.body.date,
        user:req.user},
        (err)=> {
            if (err) {
                console.log(err)
            } else {
                exercise.find({user:req.user},(error, results) =>{
                    if (error){console.log(error)}
                    else{
                        User.findOneAndUpdate({_id: req.user._id}, {
                            exerciseTracking:results
                        },(err1)=>{
                            if(err1){console.log(err1)}
                        });
                        res.redirect('/exerciseTracker');
                        }
                } )

            }
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
            if(err){console.log(err)}else{
                exercise.find({user:req.user},(error, results) =>{
                    if (error){console.log(error)}
                    else{
                        User.findOneAndUpdate({_id: req.user._id}, {
                            exerciseTracking:results
                        },(err1)=>{
                            if(err1){console.log(err1)}
                        });
                        res.redirect('/exerciseTracker');
                    }
                } )
            }
    })
});

module.exports = router;