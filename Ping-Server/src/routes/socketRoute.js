const express = require('express');
const { removeSocketID, storeSocketID } = require('../controller/socketController');

const router = express.Router();

router
    .post('/storeSocketID', storeSocketID)
    .post('/removeSocketID', removeSocketID)

module.exports = router;