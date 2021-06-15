const express = require('express');
const { loadContacts, searchUsers, addContact } = require('../controller/homeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router
    .get('/loadContacts', loadContacts)
    .get('/searchUsers', searchUsers)
    .post('/addContact', addContact)

module.exports = router;