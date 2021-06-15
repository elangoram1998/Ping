const express = require('express');
const auth = require('../middleware/auth');
const { loadMessages } = require('../controller/messageController');

const router = express.Router();

router.use(auth);

router
    .get('/loadMessages', loadMessages)

module.exports = router;