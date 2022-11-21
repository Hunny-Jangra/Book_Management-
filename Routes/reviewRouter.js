const express = require('express');
const router = express.Router();
const reviewController = require('../Controller/reviewController');

router
    .route('/books/:bookId/review')
    .post(reviewController.createReview);

router
    .route('/books/:bookId/review/:reviewId')
    .put(reviewController.updateReview);

router
    .route('/books/:bookId/review/:reviewId')
    .delete(reviewController.deleteReviewData);

module.exports = router;