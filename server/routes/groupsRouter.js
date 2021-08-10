var express = require('express');
var User = require('../models/user');
var Groups = require('../models/groups');
var groupRouter = express.Router();
var authenticate = require('../../authenticate');
var cors = require('./cors');


groupRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, (req,res)=> {res.statusCode=200})
.get(cors.cors, authenticate.verifyUser, (req,res,next) =>{
    User.findById(req.user._id)
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.groups);
    }, (err)=>next(err))
    .catch(err=>next(err));
});


groupRouter.route('/:roomId')
.options(cors.corsWithOptions, authenticate.verifyUser, (req,res)=> {res.statusCode=200})
.get(cors.cors, authenticate.verifyUser, (req,res,next)=>{
    Groups.findOne({groupId: req.params.roomId})
    .populate('messages')
    .then((group)=>{
        if(!group){
            var err = new Error('RoomId not found');
            err.status = 403;
            next(err);
        }
        else{
            if(!group.members.includes(req.user.username)){
                var err = new Error('User not a part of the room');
                err.status = 403;
                next(err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(group.messages);
        }
    }, (err)=> next(err))
    .catch((err)=>next(err));
});


module.exports = groupRouter;
