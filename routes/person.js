var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Person = require('../models/Person.js');

router.get('/',function(req,res,next){

    Person.find(function(err,person){
        if(err)
        {
            return next(err);
        }
        res.json(person);

    })

})
router.get('/userinfo/:U_Name',function(req,res,next){
    
        var U_Name = req.body.U_Name;
    
        Person.aggregate([
            {
                $match : {
                    U_Name:req.params.U_Name
                }
            },
            {
                $lookup:{
                    from : "users",
                    localField:"U_Name",
                    foreignField:"U_Name",
                    as:"loginDetails"
                }
            },
            {
                $lookup:{
                    from : "messages",
                    localField:"U_Name",
                    foreignField:"Receiver_Name",
                    as:"inboxDetails"
                }
            }
    
            
        ], function(err, person){
            if(err)
            {
                return next(err);
            }
            res.json(person);
        })
    })
    
router.get('/:U_Name/:U_Pass',function(req,res,next){
    var U_Name = req.body.U_Name;
    var U_Pass = req.body.U_Pass;

    //res.send(emailAddress + ' ' + password);

    Person.find({U_Name:req.params.U_Name,U_Pass:req.params.U_Pass}, function(err,person){
        if(err)
        {
            return next(err);
        }
        
        res.json(person);
        
    })

})
router.post('/',function(req,res,next){
    
       Person.create(req.body,function(err,person){
        if(err)
        {
            if(err.code == 11000)
            {
                res.send("Duplicate key, or already exist");
            }
            else{
                res.send(err + " cannot be empty");
            }
            return next(err);
        }
        res.send("Successfully registered!!!");
    })
  /*  Person.nextCount(function(err, count) {
            console.log(count)           // count === 0 -> true
        
            var person = new Person();
            person.save(function(err) {
        
                // book._id === 0 -> true
        
                person.nextCount(function(err, count) {
        
                    // count === 1 -> true
        
                });
            });
        });
    */

})
router.delete('/',function(req,res,next){

       Person.remove(function(err,person){
        if(err)
        {
            return next(err);
        }
        res.json(person);
    })

})
router.put('/:U_Name', function(req, res, next) {

    var U_Name = req.body.U_Name;
    
    Person.findOneAndUpdate({U_Name:req.params.U_Name},req.body,function(err,person){
        if(err)
        {
          return next(err);
        }
        res.json(person);
      })
    });

router.delete('/:U_Name',function(req,res,next){

        var U_Name = req.body.U_Name;

       Person.findOneAndRemove({U_Name:req.params.U_Name},req.body,function(err,person){
        if(err)
        {
            return next(err);
        }
        res.send("Successfully deleted!!!");
    })

})

module.exports = router;