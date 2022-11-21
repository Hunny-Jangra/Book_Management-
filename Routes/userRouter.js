const express = require('express');
const UserController = require('../Controller/userController');
const router = express.Router();

router
    .route('/register')
    .post(UserController.createUser);
router
    .route('/login')
    .post(UserController.loginUser);

module.exports = router;