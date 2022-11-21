const Review_Model = require('../Models/reviewModels');
const Book_Model = require('../Models/bookModels');
const UserModel = require('../Models/userModels');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

exports.createReview = async(req, res) => {
    try{

        const bookId = req.params.bookId;
        console.log(bookId);
        let checkBook = {};
        checkBook.id = bookId;
        checkBook.isDeleted = false;
        const check_book_ID = await Book_Model.findOne(checkBook);
        console.log(check_book_ID);
        if(!check_book_ID) {
            return res.status(400).send({
                status: false,
                message: "BookId is not Exists"
            })
        }else{
            const data1 = {};
            data1.bookId = req.body.bookId;
            data1.reviewedBy = req.body.reviewedBy;
            data1.reviewedAt = req.body.reviewedAt;
            data1.rating = req.body.rating;
            data1.review = req.body.review;
            
            const reviewsData1 = await Review_Model.create(data1);
            // console.log(reviewsData1);
            
            const reviewsData = await Review_Model.find({bookId: data1.bookId});
            console.log(reviewsData);

           
            let data = {}; 
            data._id = check_book_ID._id;
            data.title = check_book_ID.title;
            data.excerpt = check_book_ID.excerpt;
            data.userId = check_book_ID.userId;
            data.category = check_book_ID.category;
            data.subcategory = check_book_ID.subcategory;
            data.reviews = reviewsData.length;
            data.releasedAt = check_book_ID.releasedAt;
            data.createdAt = check_book_ID.createdAt;
            data.updatedAt = check_book_ID.updatedAt;
            data.reviewsData = reviewsData;
            return res.status(200).send({
                status: true,
                message: "Books List",
                data,
                

            })
            
        }

    }catch(error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

exports.updateReview = async(req, res) => {
    try{

        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId;
        console.log(bookId);
        let checkBook = {};
        checkBook.id = bookId;
        checkBook.isDeleted = false;
    
        let checkReview = {};
        checkReview.id = reviewId;
        checkReview.isDeleted = false;
        const check_book_ID = await Book_Model.findOne(checkBook);
        console.log(check_book_ID);
        if(!check_book_ID) {
            return res.status(400).send({
                status: false,
                message: "BookId is not Exists"
            })
        }
        const check_review_ID = await Review_Model.findOne(checkReview);
        if(!check_review_ID) {
            return res.status(400).send({
                status: false,
                message: "reviewId is not Exists"
            })
        }
    
        const reviewsData = await Review_Model.findByIdAndUpdate({_id: reviewId}, {$set: {review: req.body.review, rating: req.body.rating, reviewedBy: req.body.reviewedBy}}, {new: true});
        console.log(reviewsData)

        let data = {}; 
        data._id = check_book_ID._id;
        data.title = check_book_ID.title;
        data.excerpt = check_book_ID.excerpt;
        data.userId = check_book_ID.userId;
        data.category = check_book_ID.category;
        data.subcategory = check_book_ID.subcategory;
        data.reviews = reviewsData.length;
        data.releasedAt = check_book_ID.releasedAt;
        data.createdAt = check_book_ID.createdAt;
        data.updatedAt = check_book_ID.updatedAt;
        data.reviewsData = reviewsData;
        return res.status(200).send({
            status: true,
            message: "Books List",
            data,
            

        })
        
    }catch(error){
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }




}

exports.deleteReviewData = async(req, res) => {
    try{
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId;
        console.log(bookId);
        let checkBook = {};
        checkBook.id = bookId;
        checkBook.isDeleted = false;
    
        let checkReview = {};
        checkReview.id = reviewId;
        checkReview.isDeleted = false;
        const check_book_ID = await Book_Model.findOne(checkBook);
        // console.log(check_book_ID);
        if(!check_book_ID) {
            return res.status(400).send({
                status: false,
                message: "BookId is not Exists"
            })
        }
        const check_review_ID = await Review_Model.findOne(checkReview);
        // console.log(check_review_ID)
        if(!check_review_ID) {
            return res.status(400).send({
                status: false,
                message: "reviewId is not Exists"
            })
        }
        
        await Review_Model.findByIdAndDelete({_id: reviewId});

        const reviewsData = await Review_Model.find({bookId: bookId});
        console.log(reviewsData);


       
        let data = {}; 
        data._id = check_book_ID._id;
        data.title = check_book_ID.title;
        data.excerpt = check_book_ID.excerpt;
        data.userId = check_book_ID.userId;
        data.category = check_book_ID.category;
        data.subcategory = check_book_ID.subcategory;
        data.reviews = reviewsData.length;
        data.releasedAt = check_book_ID.releasedAt;
        data.createdAt = check_book_ID.createdAt;
        data.updatedAt = check_book_ID.updatedAt;
        data.reviewsData = reviewsData;
        return res.status(200).send({
            status: true,
            message: "Books List",
            data,
            

        })




    }catch(error){
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}