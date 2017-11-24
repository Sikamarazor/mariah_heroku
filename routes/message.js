var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Message = require('../models/Message.js');

/* GET message listing. */
router.get('/', function(req, res, next) {

  Message.find(function(err,message){
    if(err)
    {
      return next(err);
    }
    res.json(message);
  })
});

router.get('/usern/:Receiver_Name', function(req, res, next) {

  var Receiver_Name = req.body.Receiver_Name;

  Message.find({ Receiver_Name: req.params.Receiver_Name},function(err,message){
    if(err)
    {
      return next(err);
    }
    res.json(message);
  })
});

router.get('/:_id', function (req, res, next) {

  var _id = req.body._id;

  Message.find({ _id: req.params._id }, function (err, message) {
    if (err) {
      return next(err);
    }
    res.json(message);
  })
});

router.post('/', function(req, res, next) {

  Message.create(req.body,function(err,message){
    if(err)
    {
      return next(err);
    }
    res.json(message);
  })
});
router.put('/:_id', function (req, res, next) {

  var _id = req.body._id;

  Message.findOneAndUpdate({ _id: req.params._id }, req.body, function (err, message) {
    if (err) {
      return next(err);
    }
    res.json(message);
  })
});

router.delete('/delete/:_id',function(req,res,next){
  
          var _id = req.body._id;
  
         Message.findOneAndRemove({_id:req.params._id},req.body,function(err,message){
          if(err)
          {
              return next(err);
          }
          res.json(message);
      })
  
  })
router.delete('/', function(req, res, next) {

  Message.remove(function(err,message){
    if(err)
    {
      return next(err);
    }
    res.json(message);
  })
});


module.exports = router;
