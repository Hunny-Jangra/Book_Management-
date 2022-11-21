const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectID,
        required: [true, 'this field is mandatory'],
        ref: 'Book_Model'
    },
    reviewedBy: {
        type: String,
        required: [true, 'reviewedBy is mandatory field'],
        default: 'Guest'
    },
    reviewedAt: {
        type: Date,
        required:[true, 'reviewedAt is mandatory field']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'rating filed is mandatory']
    },
    review: {
        type: String   
    },
    isDeleted: {
        type: String,
        default: false
    }
}, {timestamps: true});

const Review_Model = mongoose.model('Review_Model', reviewSchema);

module.exports = Review_Model;