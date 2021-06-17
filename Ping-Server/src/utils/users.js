const logger = require('../utils/logger');

const users = [];

const addUser = ({ socketID, userID }) => {
    const checkUser = users.find(user => {
        return user.userID === userID
    });
    if (!!checkUser) {
        return {
            'Error': 'User already connected'
        }
    }

    const user = { socketID, userID }
    users.push(user);
    logger(`${users}`);
    logger(`${userID} connected to the socket ID ${socketID}`);
    return user;
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

module.exports = {
    addUser,
    getUser,
    getSocketID,
    removeUser
}