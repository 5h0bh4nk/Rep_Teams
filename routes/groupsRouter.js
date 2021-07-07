var express = require('express');
var Groups = require('../models/groups');
var User = require('../models/user');
var groupRouter = express.Router();
var authenticate = require('../authenticate');
var cors = require('./cors');

groupRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, (req,res)=> {res.statusCode=200})
.get(cors.cors, authenticate.verifyUser, (req,res,next) =>{
    User.findById(req.user._id)
    .then((groups)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(groups);
    }, (err)=> {
        next(err);
    })
    .catch(err=>{
        next(err);
    });
})
.post(cors.cors, authenticate.verifyUser , (req, res, next)=>{
    User.findById(req.user._id)
    .then((user)=>{
        
    })
})

module.exports = groupRouter;
