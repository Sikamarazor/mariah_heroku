var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Recipient = require('../models/Recipient.js');

/* GET recipient listing. */
router.get('/', function(req, res, next) {

  Recipient.find(function(err,recipient){
    if(err)
    {
      return next(err);
    }
    res.json(recipient);
  })
});

router.get('/:R_Id', function(req, res, next) {

var R_Id = req.body.R_Id;

  Recipient.find({R_Id:req.params.R_Id},function(err,recipient){
    if(err)
    {
      return next(err);
    }
    res.json(recipient);
  })
});

router.post('/', function(req, res, next) {

  Recipient.create(req.body,function(err,recipient){
    if(err)
    {
      return next(err);
    }
    res.json(recipient);
  })
});

router.delete('/:R_Id', function(req, res, next) {

  var R_Id = req.body.R_Id;

  Recipient.findOneAndRemove({R_Id:req.params.R_Id},req.body,function(err,recipient){
    if(err)
    {
      return next(err);
    }
    res.json(recipient);
  })
});

router.delete('/', function(req, res, next) {

  Recipient.remove(function(err,recipient){
    if(err)
    {
      return next(err);
    }
    res.json(recipient);
  })
});

module.exports = router;
