const express = require('express');
const auth = require('../middleware/auth');
const {
    loadMessages,
    checkOnline,
    updateMessageHeight,
    updateMessageState,
    updateScrollHeight } = require('../controller/messageController');

const router = express.Router();

router.use(auth);

router
    .get('/loadMessages', loadMessages)
    .get('/checkOnline', checkOnline)
    .post('/updateMsgHeight', updateMessageHeight)
    .patch('/updateMsgState', updateMessageState)
    .patch('/updateScrollHeight', updateScrollHeight)

module.exports = router;