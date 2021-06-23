const Contact = require('../model/contactsCollection');

const updateTotalMessageCount = async (roomID) => {
    const contact = await Contact.find({ roomID });
    console.log(contact);
    await Contact.updateMany(
        {
            _id: {
                $in: contact
            }
        },
        {
            $inc: {
                totalMessageCount: 1
            }
        }
    );
}

module.exports = {
    updateTotalMessageCount
}