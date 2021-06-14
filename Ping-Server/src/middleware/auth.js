const jwt = require('jsonwebtoken');
const config = require('config');

const Account = require('../model/accountCollection');
const Contact = require('../model/contactsCollection');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decode = await jwt.decode(token, config.get('tokenKey'));
        const account = await Account.findOne({ _id: decode._id, 'tokens.token': token });
        if (!account) {
            throw new Error('account session timeout');
        }
        logger(`${account.username} has authendicated..`);
        req.account = account;
        req.token = token;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(401).send({ 'Error': 'Please authendicate' });
    }
}

module.exports = auth;