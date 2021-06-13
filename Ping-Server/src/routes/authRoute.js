const express = require('express');
const { register, login, usernameExist, logout } = require('../controller/authController');

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)
    .get('/checkUsername', usernameExist)

module.exports = router;