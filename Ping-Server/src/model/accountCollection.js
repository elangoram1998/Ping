const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value) || !validator.matches(value, '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                throw new Error('Email is not valid');
            }
        }
    },
    avatar: {
        type: String,
        required: true,
        default: '/app/src/assets/profile.png'
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.matches(value, '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')) {
                throw new Error('Password is invalid');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
