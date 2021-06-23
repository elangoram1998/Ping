const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');
const ChatRoom = require('../model/chatRoomCollection.js');
const Message = require('../model/messageCollection');
const { addUser, getSocketID, getUser, removeUser } = require('../utils/users');
const { updateState } = require('../utils/realTimeData');

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

const checkOnline = async (req, res, next) => {
    const contactID = req.query.contactID;
    logger(`chekcing is ${contactID} online now`);
    const user = getUser(contactID);
    if (user) {
        return res.status(HttpStatusCode.OK).send(true);
    }
    res.status(HttpStatusCode.OK).send(false);
}

const updateMessageHeight = async (req, res, next) => {
    const roomID = req.query.roomID;
    const message = req.body.message;
    logger(`Updating message height`);
    const messageData = await Message.findById({ _id: message._id }).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    if (messageData.messageHeight == 0) {
        messageData.messageHeight = message.messageHeight;
        await messageData.save().catch((error) => {
            error.statusCode = HttpStatusCode.INTERNAL_SERVER;
            next(error);
        });
    }
    res.status(HttpStatusCode.OK).send();
}

const updateMessageState = async (req, res, next) => {
    const roomID = req.query.roomID;
    const contactID = req.query.contactID;
    const messages = req.body.messages;
    const updatedMsg = req.body.updatedMsg;
    console.log(messages);
    await Message.updateMany(
        {
            _id: {
                $in: messages
            },
            $set: {
                state: 'read'
            }
        }
    ).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    updateState(contactID, roomID, updatedMsg);
    res.status(HttpStatusCode.OK).json({
        'success': 'Message state updated successfully'
    });
}

module.exports = {
    loadMessages,
    storeSocketID,
    removeSocketID,
    checkOnline,
    updateMessageHeight,
    updateMessageState
}