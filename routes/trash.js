var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Trash = require('../models/Trash.js');

/* GET trash listing. */
router.get('/', function(req, res, next) {

  Trash.find(function(err,trash){
    if(err)
    {
      return next(err);
    }
    res.json(trash);
  })
});

router.get('/:T_Id', function(req, res, next) {

var T_Id = req.body.T_Id;

  Trash.find({T_Id:req.params.T_Id},function(err,trash){
    if(err)
    {
      return next(err);
    }
    res.json(trash);
  })
});

router.post('/', function(req, res, next) {

  Trash.create(req.body,function(err,trash){
    if(err)
    {
      return next(err);
    }
    res.json(trash);
  })
});

router.delete('/:T_Id', function(req, res, next) {

  var T_Id = req.body.T_Id;

  Trash.findOneAndRemove({T_Id:req.params.T_Id},req.body,function(err,trash){
    if(err)
    {
      return next(err);
    }
    res.json(trash);
  })
});

router.delete('/', function(req, res, next) {

  Trash.remove(function(err,trash){
    if(err)
    {
      return next(err);
    }
    res.json(trash);
  })
});

module.exports = router;
