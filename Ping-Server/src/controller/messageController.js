const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');
const ChatRoom = require('../model/chatRoomCollection.js');
const { addUser, getSocketID, getUser, removeUser } = require('../utils/users');

const loadMessages = async (req, res, next) => {
    const roomID = req.query.roomID;
    const chatRoom = await ChatRoom.findOne({ roomID }).populate({
        path: 'messages',
        populate: {
            path: 'owner_id'
        }
    }).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${roomID} messages has been fetched`);
    res.status(HttpStatusCode.OK).send(chatRoom);
}

const storeSocketID = async (req, res, next) => {
    const socketID = req.body.socketID;
    const userID = req.body.userID;
    const { error, user } = addUser({ socketID, userID });
    if (error) {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    }
    res.status(HttpStatusCode.OK).send(user);
}

const removeSocketID = async (req, res, next) => {
    const socketID = req.body.socketID;
    const { users, error } = removeUser(socketID);
    if (error) {
        error.statusCode = HttpStatusCode.NOT_FOUND;
        next(error);
    }
    res.status(HttpStatusCode.OK).send();
}

const checkOnline = async (req, res, next) => {
    const contactID = req.query.contactID;
    const user = getUser(contactID);
    if (user) {
        return res.status(HttpStatusCode.OK).send(true);
    }
    res.status(HttpStatusCode.OK).send(false);
}

module.exports = {
    loadMessages,
    storeSocketID,
    removeSocketID,
    checkOnline
}