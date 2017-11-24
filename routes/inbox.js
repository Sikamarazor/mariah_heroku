var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Inbox = require('../models/Inbox.js');

/* GET inbox listing. */
router.get('/', function(req, res, next) {

  Inbox.find(function(err,inbox){
    if(err)
    {
      return next(err);
    }
    res.json(inbox);
  })
});

router.get('/:U_Name', function(req, res, next) {

var U_Name = req.body.U_Name;

  Inbox.find({U_Name:req.params.U_Name},function(err,inbox){
    if(err)
    {
      return next(err);
    }
    res.json(inbox);
  })
});

router.post('/', function(req, res, next) {

  Inbox.create(req.body,function(err,inbox){
    if(err)
    {
      return next(err);
    }
    res.json(inbox);
  })
});

router.delete('/:M_Id', function(req, res, next) {

  var M_Id = req.body.M_Id;

  Inbox.findOneAndRemove({M_Id:req.params.M_Id},req.body,function(err,inbox){
    if(err)
    {
      return next(err);
    }
    res.json(inbox);
  })
});

router.delete('/', function(req, res, next) {

  Inbox.remove(function(err,inbox){
    if(err)
    {
      return next(err);
    }
    res.json(inbox);
  })
});



module.exports = router;
