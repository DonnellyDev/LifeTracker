const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const ExpenseEntries= require('../models/expenseModels');
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

router.get('/', IsLoggedIn,function(req, res, next){
    ExpenseEntries.find({user:req.user},(err,expenseTracked)=>{
        if(err){console.log(err);}
        else{res.render('expenseTracker/indexExpense', { title: 'expense Tracker' ,user:req.user,dataset:expenseTracked});}
    })
});

/** Get Add Page **/
router.get('/add', IsLoggedIn,function(req, res, next) {
    ExpenseEntries.find({user:req.user},(err,expenseTracked)=>{
        if(err){console.log(err);}
        else{res.render('expenseTracker/addExpense', { title: 'Add a Expense' ,user:req.user,dataset:expenseTracked});}

    })
});

/** Get Edit Page **/
router.get('/edit/:_id', IsLoggedIn,function(req, res, next) {
    ExpenseEntries.findById(req.params._id,(err,foodTracked)=>{
        if(err){console.log(err);}
        else{res.render('expenseTracker/editExpenseTracker', { title: 'Update a Expense' ,user:req.user,expenseItem:expenseTracked});}
    })
});

/** Delete Handler **/
router.get('/delete/:_id',IsLoggedIn,function (req,res,next){
    ExpenseEntries.remove({_id:req.params._id},(error => {
        if(error){console.log(error);}else {res.redirect('/expenseTracker');}
    }));
});

/**-------------------------
 * Post Routes
 ---------------------------*/

router.post('/add',IsLoggedIn,(req, res, next) => {
    ExpenseEntries.create({
            date:req.body.date,
            account: req.body.account,
            description: req.body.descriptionExpense,
            amount:req.body.amount,
            note:req.body.note,
            user:req.user},
        (err)=> {
            if(err){console.log(err)}else{res.redirect('/expenseTracker')}
        });
});

router.post('/edit/:_id',IsLoggedIn,(req, res, next) => {
    ExpenseEntries.findOneAndUpdate({_id:req.params._id},{
            date:req.body.date,
            account: req.body.account,
            description: req.body.description,
            note:req.body.note,
            user:req.user},
        (err)=> {
            if(err){console.log(err)}else{res.redirect('/expenseTracker')}
        })
});






module.exports =router;