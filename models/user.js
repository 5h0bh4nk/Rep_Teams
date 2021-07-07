const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default:''
    },
    // to intergrate facebook auth2.O
    facebookId: String,
    admin: {
        type: Boolean,
        default: false
    },
    // groups to which a person is connected
    groups:[{
        type: String
    }]
});

User.plugin(passportLocalMongoose);
//added passport auth

module.exports = mongoose.model('User',User);