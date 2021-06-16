const express = require('express');
const auth = require('../middleware/auth');
const { loadMessages, storeSocketID, removeSocketID } = require('../controller/messageController');

const router = express.Router();

router.use(auth);

router
    .get('/loadMessages', loadMessages)
    .post('/storeSocketID', storeSocketID)
    .post('/removeSocketID', removeSocketID)

module.exports = router;