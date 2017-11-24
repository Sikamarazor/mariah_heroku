var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

router.get('/',function(req,res,next){

    User.find(function(err,user){
        if(err)
        {
            return next(err);
        }
        res.json(user);

    })

})
router.get('/:U_Name/:U_Pass',function(req,res,next){
    var U_Name = req.body.U_Name;
    var U_Pass = req.body.U_Pass;

    //res.send(emailAddress + ' ' + password);

    User.find({U_Name:req.params.U_Name,U_Pass:req.params.U_Pass}, function(err,user){
        if(err)
        {
            return next(err);
        }
        
        res.json(user);
        
    })

})
router.post('/',function(req,res,next){

       User.create(req.body,function(err,user){
        if(err)
        {
            return next(err);
        }
        res.send("Successful!!!");
    })

})
router.delete('/',function(req,res,next){

       User.remove(function(err,user){
        if(err)
        {
            return next(err);
        }
        res.json(user);
    })

})
router.delete('/:U_Name',function(req,res,next){

        var U_Name = req.body.U_Name;

       User.findOneAndRemove({U_Name:req.params.U_Name},req.body,function(err,user){
        if(err)
        {
            return next(err);
        }
        res.send("Successfully deleted!!!");
    })

})
router.put('/:U_Name',function(req,res,next){

         var U_Name = req.body.U_Name;

       User.findOneAndUpdate({U_Name:req.params.U_Name},req.body,function(err,user){
        if(err)
        {
            return next(err);
        }
        res.send("Successfully updated");
    })

})

   

module.exports = router;