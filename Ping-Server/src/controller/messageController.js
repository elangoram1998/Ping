const mongoose = require('mongoose');
const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');
const ChatRoom = require('../model/chatRoomCollection.js');
const Message = require('../model/messageCollection');
const Contact = require('../model/contactsCollection');
const { getUser } = require('../utils/users');
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
    const messageSize = messages.length;
    logger(`Updating message state`);
    let messageIDS = [];
    messages.forEach(message => {
        let ID = mongoose.Types.ObjectId(message._id);
        messageIDS.push(ID);
    });
    await Message.updateMany(
        {
            _id: {
                $in: messageIDS
            }
        },
        {
            $set: {
                state: 'read'
            }
        }
    ).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    await Contact.findOneAndUpdate(
        {
            myID: req.account._id
        },
        {
            $set: {
                readMessageCount: messages[messageSize - 1].messageCount
            }
        }
    ).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    updateState(contactID, roomID, messages);
    res.status(HttpStatusCode.OK).json({
        'success': 'Message state updated successfully'
    });
}

const updateScrollHeight = async (req, res, next) => {
    const roomID = req.query.roomID;
    const currectSclHeight = req.body.currectSclHeight;
    const totalScrollHeight = req.body.totalScrollHeight;
    logger(`Updating scroll height`);
    await ChatRoom.findOneAndUpdate(
        {
            roomID
        },
        {
            $set: {
                currectSclHeight,
                totalScrollHeight
            }
        }
    ).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    res.status(HttpStatusCode.OK).json({
        'success': 'Scroll height updated successfully'
    });
}

module.exports = {
    loadMessages,
    checkOnline,
    updateMessageHeight,
    updateMessageState,
    updateScrollHeight
}