const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    myID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    contactID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    roomID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    totalMessageCount: {
        type: Number,
        default: 0,
        required: true
    },
    readMessageCount: {
        type: Number,
        default: 0,
        required: true,
        min: [0, "message read count should not below zero"]
    },
    state: {
        type: String,
        default: 'Not added',
        enum: ['added', 'Not added', 'blocked'],
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;