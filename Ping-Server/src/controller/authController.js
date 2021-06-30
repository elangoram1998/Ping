const Account = require('../model/accountCollection');
const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');

const register = async (req, res, next) => {
    const payload = req.body;
    const account = new Account(payload);
    await account.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${payload.username} account has been successfully created`);
    /** AWS Email functionality

     **/

    res.status(HttpStatusCode.OK).json({
        success: 'Account has been created successfully'
    });
}

const login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const account = await Account.findUserByCredentials(username, password).catch((error) => {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    });
    logger(`${username} logged in to the application`);
    const token = await account.generateToken();
    res.status(HttpStatusCode.OK).json({
        account,
        token
    });
}

const usernameExist = async (req, res, next) => {
    const username = req.query.username;
    const isUsernameExist = await Account.isUsernameExist(username).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    if (isUsernameExist) {
        logger(`${username} is already taken`);
        return res.status(HttpStatusCode.OK).send(true);
    }
    res.status(HttpStatusCode.OK).send(false);
}



module.exports = {
    register,
    login,
    usernameExist
}