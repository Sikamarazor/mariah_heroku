var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sent = require('../models/Sent-Mail.js');

router.get('/',function(req,res,next){

    Sent.find(function(err,sent){
        if(err)
        {
            return next(err);
        }
        res.json(sent);

    })

})
router.get('/:from',function(req,res,next){
    
        var from = req.body.from;
    
        Sent.findOne({from:req.params.from}, function(err,sent){
            if(err)
            {
                return next(err);
            }
            res.json(sent);
    
        })
    
    })
router.delete('/', function(req, res, next) {
    
      Sent.remove(function(err,sent){
        if(err)
        {
          return next(err);
        }
        res.json(sent);
      })
    })
router.post('/',function(req,res,next){

       Sent.create(req.body,function(err,sent){
        if(err)
        {
            return next(err);
        }
        res.json(sent);
    })

});

router.put('/:from', function(req, res, next) {
    
      var from = req.body.from;
      //var rangeNum = req.body.rangeNum;
    
      Sent.findOneAndUpdate({from:req.params.from},{$push:{'S_Message':{to: req.body.to,subject: req.body.subject,message: req.body.message}}},req.body,function(err,sent){
        if(err)
        {
          return next(err);
        }
        res.json(sent);
      })
    });

module.exports = router;