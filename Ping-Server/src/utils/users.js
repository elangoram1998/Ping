const logger = require('../utils/logger');

const users = [];
const peers = [];

const addUser = ({ socketID, userID }) => {
    const index = users.findIndex(user => user.userID === userID);
    if (index === -1) {
        const user = { socketID, userID }
        users.push(user);
        logger(`${userID} connected to the socket ID ${socketID}`);
        console.log(users);
        return user;
    }
    else {
        users[index].socketID = socketID;
        logger(`Updating socketID ${socketID} of user ${userID}`);
        console.log(users);
        return user[index];
    }
}

const getUser = (userID) => {
    const user = users.find(user => user.userID === userID);
    logger(`Get user details of ID: ${userID}`);
    return user;
}

const getSocketID = (userID) => {
    const user = getUser(userID);
    if (user === undefined) {
        return null;
    }
    logger(`Returning socketID of ${userID}`);
    return user.socketID;
}

const removeUser = (socketID) => {
    const index = users.findIndex(user => user.socketID === socketID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return {
        'Error': 'User not present'
    };
}

const addPeer = (peersArray) => {
    logger(`Adding peer connections...`);
    peersArray.forEach(ID => {
        const index = peers.findIndex(peer => peer.ID === ID);
        if (index === -1) {
            peers.push({ ID });
        }
    });
    console.log(peers);
}

const removePeer = (peersArray) => {
    peersArray.forEach(ID => {
        const index = peers.findIndex(peer => peer.ID === ID);
        if (index !== -1) {
            logger(`Removing peer connection...`);
            peers.splice(index, 1)[0];
        }
    });
    console.log(peers);
}

const getPeer = (userID) => {
    const peer = peers.find(peer => peer.ID === userID);
    logger(`Get peer user ${peer}`);
    return peer;
}

module.exports = {
    addUser,
    getUser,
    getSocketID,
    removeUser,
    addPeer,
    removePeer,
    getPeer
}