const { v4: uuidv4 } = require('uuid');
const Contact = require('../model/contactsCollection');
const Account = require('../model/accountCollection');
const ChatRoom = require('../model/chatRoomCollection');
const HttpStatusCode = require('../utils/httpStatusCode');
const logger = require('../utils/logger');
const { createContact, sendContactData } = require('../utils/createContact');

const loadContacts = async (req, res, next) => {
    const myAccountID = req.account._id;
    logger(`Load contacts for ${myAccountID}`);
    const contacts = await Contact.find({ myID: myAccountID }).populate('contactID').catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    res.status(HttpStatusCode.OK).send(contacts);
}

const searchUsers = async (req, res, next) => {
    const username = req.query.username;
    logger(`Get the results for ${username}`);
    const response = await Account.find({
        username: {
            $regex: new RegExp(username),
            $options: 'i'
        }
    }).select('username avatar email').catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    res.status(HttpStatusCode.OK).send(response);
}

const addContact = async (req, res, next) => {
    const account = req.account;
    const contactID = req.body.contactID;
    const chatRoom = new ChatRoom({
        roomID: uuidv4()
    });
    await chatRoom.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${chatRoom.roomID} chat room has been created`);
    const myContact = await createContact(account._id, contactID, chatRoom.roomID);

    sendContactData(contactID, account._id, chatRoom.roomID);

    res.status(HttpStatusCode.OK).send(myContact);
}

const updateAccount = async (req, res, next) => {
    const bio = req.body.bio;
    const email = req.body.email;
    req.account.bio = bio;
    req.account.email = email;
    await req.account.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`Account updated`);
    res.status(HttpStatusCode.OK).send(req.account);
}

const logout = async (req, res, next) => {
    req.account.tokens = req.account.tokens.filter(tokens => tokens.token != req.token);
    await req.account.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${req.account.username} logged out the application`);
    res.status(HttpStatusCode.OK).json({
        success: 'User logged out successfully'
    });
}

module.exports = {
    loadContacts,
    searchUsers,
    addContact,
    updateAccount,
    logout
}