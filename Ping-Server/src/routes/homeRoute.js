const express = require('express');
const { loadContacts, searchUsers, addContact, logout } = require('../controller/homeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router
    .get('/loadContacts', loadContacts)
    .get('/searchUsers', searchUsers)
    .post('/addContact', addContact)
    .post('/logout', logout)

module.exports = router;