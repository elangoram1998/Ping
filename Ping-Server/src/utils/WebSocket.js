const chalk = require('chalk');
const ChatRoom = require('../model/chatRoomCollection');
const Message = require('../model/messageCollection');
const { removeUser, getSocketID, addPeer, removePeer } = require('./users');
const { sendMessage } = require('./realTimeData');
const { updateTotalMessageCount } = require('./utils');

const errorMsg = chalk.underline.red.bold;
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
                updateTotalMessageCount(roomID);
                const messagePopulated = await message.populate('owner_id').execPopulate();
                sendMessage(contactID, roomID, messagePopulated);
                callback({ message: messagePopulated, roomID });
            }
            catch (error) {
                console.error(errorMsg(`Something went wrong, Error: ${error}`));
            }
        });

        socket.on('call', ({ contactID, account }) => {
            const socketID = getSocketID(contactID);
            const caller = account;
            if (socketID) {
                global.io.to(socketID).emit('getting-call', caller);
            }
        });

        socket.on('answer-call', ({ callerID, peerID }) => {
            const socketID = getSocketID(callerID);
            const peersArray = [socket._id, callerID];
            if (socketID) {
                global.io.to(socketID).emit('call-picked', peerID);
                addPeer(peersArray);
            }
        });

        socket.on('disconnect-call', ({ contactID, peerID }) => {
            const socketID = getSocketID(contactID);
            const peersArray = [socket._id, contactID];
            if (socketID) {
                global.io.to(socketID).emit('user-disconnected', peerID);
                removePeer(peersArray);
            }
        });

        socket.on('cancel-call', ({ contactID, account }) => {
            const socketID = getSocketID(contactID);
            const caller = account;
            if (socketID) {
                global.io.to(socketID).emit('hide-notification', caller);
            }
        });

        socket.on('cut-call', ({ contactID }) => {
            const socketID = getSocketID(contactID);
            if (socketID) {
                global.io.to(socketID).emit('not-responded', contactID);
            }
        });

        socket.on('disconnect', () => {
            console.log(warning("WebSocket connection disconnected"));
            removeUser(socket.id);
        });
    }
}

module.exports = new WebSocket();