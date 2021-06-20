const express = require('express');
const auth = require('../middleware/auth');
const { loadMessages, storeSocketID, removeSocketID, checkOnline } = require('../controller/messageController');

const router = express.Router();

router.use(auth);

router
    .get('/loadMessages', loadMessages)
    .post('/storeSocketID', storeSocketID)
    .post('/removeSocketID', removeSocketID)
    .get('/checkOnline', checkOnline)

module.exports = router;