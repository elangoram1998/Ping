const Contact = require('../model/contactsCollection');
const Account = require('../model/accountCollection');
const HttpStatusCode = require('../utils/httpStatusCode');

const loadContacts = async (req, res) => {
    const myAccountID = req.account._id;
    const contacts = await Contact.find({ myID: myAccountID }).populate('contactID').catch((error) => {
        error.statusCode = HttpStatusCode.INTERNAL_SERVER;
        next(error);
    });
    res.status(HttpStatusCode.OK).send(contacts);
}

module.exports = {
    loadContacts
}