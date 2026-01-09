const express = require('express');

const router = express.Router();

const {
    createUser,
    userLogin
} = require('../controller/userController');

router.post('/signup', createUser);
router.post('/signin', userLogin);

module.exports = router;