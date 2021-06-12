const jwt = require('jsonwebtoken');
const config = require('config');

const Account = require('../model/accountCollection');
const Contact = require('../model/contactsCollection');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decode = await jwt.decode(token, config.get('tokenKey'));
        const account = await Account.findOne({ _id: decode._id, 'tokens.token': token });
        if (!account) {
            throw new Error('account session timeout');
        }
        const contacts = await Contact.find({ myID: account._id });
        req.account = account;
        req.contacts = contacts;
        req.token = token;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).send({ 'Error': 'Please authendicate' });
    }
}

module.exports = auth;