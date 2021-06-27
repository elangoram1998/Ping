const { addUser, removeUser } = require('../utils/users');
const HttpStatusCode = require('../utils/httpStatusCode');
const logger = require('../utils/logger');

const storeSocketID = async (req, res, next) => {
    const socketID = req.body.socketID;
    const userID = req.body.userID;
    logger(`storing socketID ${socketID}`);
    const { error, user } = addUser({ socketID, userID });
    if (error) {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    }
    res.status(HttpStatusCode.OK).send(user);
}

const removeSocketID = async (req, res, next) => {
    const socketID = req.body.socketID;
    logger(`removing socketID ${socketID}`);
    const { users, error } = removeUser(socketID);
    if (error) {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    }
    res.status(HttpStatusCode.OK).send();
}

module.exports = {
    storeSocketID,
    removeSocketID
}