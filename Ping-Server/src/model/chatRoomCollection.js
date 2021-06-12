const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    currectSclHeight: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "chat scroll height should not less than zero"]
    },
    totalScrollHeight: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "chat total scroll height should not less than zero"]
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, { timestamps: true });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;