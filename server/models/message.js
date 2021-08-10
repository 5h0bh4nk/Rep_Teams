var mongoose = require('mongoose');

//Define the schema for our comments
var messageSchema = new mongoose.Schema({
    content: {
        type: String
    },
    //The author parameter is linked with the user collection, getting his id and username
    author: {
        type: String,
    },
},{
    //Automatically gets the date of creation of the comment
    timestamps: true
});

//Exports our messageSchema with Message as a reference, this reference will be used in other models
module.exports = mongoose.model("Message", messageSchema);