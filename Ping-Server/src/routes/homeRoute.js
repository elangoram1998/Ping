const express = require('express');
const { loadContacts } = require('../controller/homeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router
    .get('/loadContacts', loadContacts)

module.exports = router;