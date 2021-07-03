const { v4: uuidv4 } = require('uuid');
const config = require('config');
const Contact = require('../model/contactsCollection');
const Account = require('../model/accountCollection');
const ChatRoom = require('../model/chatRoomCollection');
const HttpStatusCode = require('../utils/httpStatusCode');
const logger = require('../utils/logger');
const { createContact, sendContactData } = require('../utils/createContact');
const { uploadImgae } = require('../utils/aws');

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

    //exclude some id's from search
    var excludeArray = [];
    excludeArray.push(req.account._id);
    const contacts = await Contact.find({ myID: req.account._id }).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    contacts.forEach(contact => {
        excludeArray.push(contact.contactID);
    });

    const response = await Account.find({
        _id: {
            $not: {
                $in: excludeArray
            }
        },
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

const changePicture = async (req, res, next) => {
    let myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];
    const filename = `${uuidv4()}.${fileType}`;
    const data = await uploadImgae(filename, req.file.buffer).catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    req.account.avatar = data.Location;
    await req.account.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${req.account.username} Profile picture changed successfully`);
    res.status(HttpStatusCode.OK).json(req.account.avatar);
}

const removePicture = async (req, res, next) => {
    req.account.avatar = config.get('s3.defaultProfilePic');
    await req.account.save().catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    logger(`${req.account.username} Profile picture removed successfully`);
    res.status(HttpStatusCode.OK).json(req.account.avatar);
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
    changePicture,
    removePicture,
    logout
}