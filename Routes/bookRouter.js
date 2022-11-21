const express = require('express');
const BoookController = require('../Controller/bookController');
const UserController = require('../Controller/userController');
const router = express.Router();

router  
    .route('/books')
    .post(UserController.protectingMID, BoookController.createBook);

router
    .route('/books')
    .get(UserController.protectingMID, BoookController.getbookData);

router
    .route('/books/:bookId')
    .get(UserController.protectingMID, BoookController.getBookById);

router
    .route('/books/:bookId')
    .put(UserController.protectingMID, BoookController.updateBookData);

router 
    .route('/books/:bookId')
    .delete(UserController.protectingMID, BoookController.deleteBookData);

module.exports = router;
