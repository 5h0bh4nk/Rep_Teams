var mongoose = require('mongoose');

//Define the schema for our comments
var messageSchema = new mongoose.Schema({
    content: String,
    //The author parameter is linked with the user collection, getting his id and username
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    //Automatically gets the date of creation of the comment
    created: {
        type: Date,
        default: Date.now()
    }
});

//Exports our messageSchema with Message as a reference, this reference will be used in other models
module.exports = mongoose.model("Message", messageSchema);