const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3001','http://localhost:5000','http://localhost:3000', 'https://localhost:3443','https://localhost:8000','https://shubh-meet.herokuapp.com/'];

var corsOptionDelegate = (req,callback) =>{
    var corsOption;

    if(whitelist.indexOf(req.header('Origin'))!==-1){
        corsOption = {origin: true};
    }
    else corsOption = {orgin: false};

    callback(null,corsOption);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);