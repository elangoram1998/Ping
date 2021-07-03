const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const config = require('config');

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
        default: config.get('s3.defaultProfilePic')
    },
    bio: {
        type: String,
        maxLength: 100
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

accountSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

accountSchema.statics.findUserByCredentials = async function (username, password) {
    const user = await Account.findOne({ username });
    if (!user) {
        throw new Error('Account not found');
    }
    const decodePassword = await bcrypt.compare(password, user.password);
    if (!decodePassword) {
        throw new Error('Username/Password is wrong');
    }
    return user;
}

accountSchema.statics.isUsernameExist = async (username) => {
    const user = await Account.findOne({ username });
    if (user) {
        return true;
    }
    return false;
}

accountSchema.methods.generateToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, config.get('tokenKey'));
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

accountSchema.methods.toJSON = function () {
    const user = this;
    const accountObject = user.toObject();
    delete accountObject.password;
    delete accountObject.tokens;

    return accountObject;
}

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
