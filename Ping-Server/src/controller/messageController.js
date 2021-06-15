const logger = require('../utils/logger');
const HttpStatusCode = require('../utils/httpStatusCode');
const ChatRoom = require('../model/chatRoomCollection.js');

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
    logger(`${roomID} has been fetched`);
    res.status(HttpStatusCode.OK).send(chatRoom);
}

module.exports = {
    loadMessages
}