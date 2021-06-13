const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'audio', 'image', 'file', 'location']
    },
    messageCount: {
        type: Number,
        required: true,
        min: [1, 'Message count wrong']
    },
    state: {
        type: String,
        required: true,
        default: 'unread',
        enum: ['read', 'unread']
    },
    messageHeight: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;