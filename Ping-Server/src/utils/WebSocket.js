const chalk = require('chalk');
const ChatRoom = require('../model/chatRoomCollection');
const chatRoom = require('../model/chatRoomCollection');
const Message = require('../model/messageCollection');
const { removeUser, getSocketID } = require('./users');
const { sendMessage } = require('./realTimeData');

const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

class WebSocket {
    connection(socket) {
        console.log(success("New websocket connection occured"));

        socket.on('sendMessage', async ({ roomID, myID, text, contactID }, callback) => {
            try {
                const chatRoom = await ChatRoom.findOne({ roomID });
                const messageSize = chatRoom.messages.length;
                const message = new Message({
                    owner_id: myID,
                    message: text,
                    type: 'text',
                    messageCount: messageSize + 1
                });
                await message.save();
                chatRoom.messages.push(message._id);
                await chatRoom.save();
                const messagePopulated = await message.populate('owner_id').execPopulate();
                sendMessage(contactID, roomID, messagePopulated);
                callback({ message: messagePopulated, roomID });
            }
            catch (error) {
                console.error(error(`Something went wrong, Error: ${error}`));
            }
        });

        socket.on('call', ({ contactID, myID, peerID }) => {
            const socketID = getSocketID(contactID);
            const callerID = myID;
            if (socketID) {
                global.io.to(socketID).emit('getting-call', callerID, peerID);
            }
        });

        socket.on('answer-call', ({ callerID, peerID }) => {
            const socketID = getSocketID(callerID);
            if (socketID) {
                global.io.to(socketID).emit('call-picked', peerID);
            }
        });

        socket.on('disconnect-call', ({ contactID, peerID }) => {
            const socketID = getSocketID(contactID);
            if (socketID) {
                global.io.to(socketID).emit('user-disconnected', peerID);
            }
        });

        socket.on('disconnect', () => {
            console.log(warning("WebSocket connection disconnected"));
            removeUser(socket.id);
        });
    }
}

module.exports = new WebSocket();