const express = require('express');
const { register, login, usernameExist } = require('../controller/authController');

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .get('/checkUsername', usernameExist)

module.exports = router;