const Account = require('../model/accountCollection');
const Contact = require('../model/contactsCollection');
const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');

const register = async (req, res) => {

}

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const account = await Account.findUserByCredentials(username, password).catch((error) => {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    });
    const token = await account.generateToken();
    res.status(HttpStatusCode.OK).json({
        account,
        token
    });
}

const logout = async (req, res) => {

}

module.exports = {
    register,
    login,
    logout
}