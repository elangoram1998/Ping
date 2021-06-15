const Account = require('../model/accountCollection');
const Contact = require('../model/contactsCollection');
const HttpStatusCode = require('./httpStatusCode');
const logger = require('./logger');

const createContact = async (myID, contactID, roomID) => {
    try {
        const contact = new Contact({
            myID,
            contactID,
            roomID
        });
        await contact.save();
        logger(`${myID} and ${contactID} contact with roomID: ${roomID} created`);
        const contactPopulated = await contact.populate('contactID').execPopulate();
        return contactPopulated;
    }
    catch (error) {
        console.log(error);
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        throw new Error(error);
    }
}

const sendContactData = async (myID, contactID, roomID) => {
    const contact = createContact(myID, contactID, roomID);

    //socket send data
}

module.exports = {
    createContact,
    sendContactData
}