const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const passport = require('passport');


function checkConfirmPassword(req,res,next){
    let password = req.body.password;
    let confirm = req.body.confirmPWD;
    if(password===confirm){return next();}
    else{res.render('user/updatePassword',{title:'Update your Password',user:req.user,message:'Password and Confirm Fields must Match'});}
}


function IsLoggedIn(req,res,next){
    if (req.isAuthenticated){
        console.log('Authenticated User');
        return next();
    }
    res.redirect('/login');
}

router.get('/', IsLoggedIn,(req, res, next) =>{
    User.find({user:req.user},(err,user)=> {
        if (err) {console.log(err);}
        else {
            res.render('user/userIndex', {title: "Dashboard", user: req.user, dataset: user});
        }
    })
});
/***
 *  User Edit Info
 *  endpoint /user/edit
 */

router.get('/edit',IsLoggedIn,(req, res, next) => {
    User.find({user:req.user},(err,user)=>{
    if(err){console.log(err);}
    else{ res.render('user/editUser',{title:"Edit your Profile", user:req.user})}
    })
})
router.post('/edit',IsLoggedIn,(req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {
            username: req.body.username,
            Personals: {
                name: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            }
        },
    (err)=>{
        if(err){console.log(err)}
        else{
            res.render('user/userIndex',{title: "Dashboard", user: req.user})
    }
    });
})
/**
 * User Password
 */
router.get('/updatePassword',IsLoggedIn,(req, res, next) => {
  res.render('user/updatePassword',{title:'Update Your Password',user:req.user});
  });

router.post('/updatePassword',IsLoggedIn,checkConfirmPassword,(req, res, next) => {
    User.findOne({_id:req.user._id},(err,user)=>{
        if(err){console.log("Can't Find user error"+err)};
        user.changePassword(req.body.oldPassword,req.body.password,(error,user)=>{
        if(error){console.log("After Change error"+error)}
        res.redirect('/login');
        })})
})




module.exports = router;