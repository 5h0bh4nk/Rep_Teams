var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    lastUpdate: Date,
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Chat', chatSchema);