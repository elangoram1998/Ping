const express = require('express');
const { loadContacts, searchUsers, addContact, updateAccount, logout } = require('../controller/homeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router
    .get('/loadContacts', loadContacts)
    .get('/searchUsers', searchUsers)
    .post('/addContact', addContact)
    .put('/editProfile', updateAccount)
    .post('/logout', logout)

module.exports = router;