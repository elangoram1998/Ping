const { getUser, getSocketID } = require('./users');

const sendMessage = (contactID, roomID, message) => {
    const socketID = getSocketID(contactID);
    if (socketID) {
        global.io.to(socketID).emit('message', { message, roomID });
    }
}

module.exports = {
    sendMessage
}