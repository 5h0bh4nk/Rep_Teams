var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    members: [{
        type: String
    }],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);