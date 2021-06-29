const jwt = require('jsonwebtoken');
const config = require('config');
const chalk = require('chalk');

const Account = require('../model/accountCollection');
const logger = require('../utils/logger');
const errorMsg = chalk.underline.red.bold;

const socketAuth = async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        if (token) {
            const decode = await jwt.decode(token, config.get('tokenKey'));
            const account = await Account.findOne({ _id: decode._id, 'tokens.token': token });
            if (!account) {
                throw new Error('account session timeout');
            }
            logger(`${account.username} has socket authendicated..`);
            socket.username = account.username;
            socket._id = account._id;
            socket.email = account.email;
            socket.avatar = account.avatar;
            next();
        }
        else {
            throw new Error("Not authorized");
        }
    }
    catch (err) {
        console.error(errorMsg(`Socket authendication failed with a error message: ${err}`));
        next(err);
    }
}

module.exports = socketAuth;