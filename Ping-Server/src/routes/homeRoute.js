const express = require('express');
const { loadContacts,
    searchUsers,
    addContact,
    updateAccount,
    changePicture,
    removePicture,
    logout } = require('../controller/homeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.use(auth);
router
    .get('/loadContacts', loadContacts)
    .get('/searchUsers', searchUsers)
    .post('/addContact', addContact)
    .put('/editProfile', updateAccount)
    .post('/changeProfilePicture', upload, changePicture)
    .post('/removeProfilePicture', removePicture)
    .post('/logout', logout)

module.exports = router;