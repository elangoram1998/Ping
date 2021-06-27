const logger = require('../utils/logger');

const users = [];

const addUser = ({ socketID, userID }) => {
    console.log(users);
    const index = users.findIndex(user => user.userID === userID);
    console.log(index);
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

module.exports = {
    addUser,
    getUser,
    getSocketID,
    removeUser
}