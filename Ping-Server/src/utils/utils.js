const Contact = require('../model/contactsCollection');

const updateTotalMessageCount = async (roomID) => {
    const contact = await Contact.find({ roomID });
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

const updateMyMessageCount = async (myID, roomID) => {
    await Contact.updateOne(
        {
            myID,
            roomID
        },
        {
            $inc: {
                myMessageCount: 1
            }
        }
    )
}

module.exports = {
    updateTotalMessageCount,
    updateMyMessageCount
}