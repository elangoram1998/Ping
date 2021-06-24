const express = require('express');
const auth = require('../middleware/auth');
const {
    loadMessages,
    storeSocketID,
    removeSocketID,
    checkOnline,
    updateMessageHeight,
    updateMessageState,
    updateScrollHeight } = require('../controller/messageController');

const router = express.Router();

router.use(auth);

router
    .get('/loadMessages', loadMessages)
    .post('/storeSocketID', storeSocketID)
    .post('/removeSocketID', removeSocketID)
    .get('/checkOnline', checkOnline)
    .post('/updateMsgHeight', updateMessageHeight)
    .patch('/updateMsgState', updateMessageState)
    .patch('/updateScrollHeight', updateScrollHeight)

module.exports = router;