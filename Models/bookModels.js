const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: 'title is mandatory filed', 
        unique: true
    },
    excerpt: {
        type: String,
        required: 'title is mandatory filed'
    },
    userId: {
        type: ObjectId, 
        required: 'userId is mandatory field', 
        ref : 'User_Model'
    },
    ISBN: {
        type: String, 
        required: 'ISBN is mandatory field',
        unique: true
    },
    category: {
        type: String, 
        required: 'category is mandatory field'
    },
    subcategory: {
        type: String, 
        required: 'subcategory is mandatory filed'
    },
    reviews: {
        type: Number, 
        default: 0
    },
    deletedAt: {
        type: Date, 
    },
    isDeleted: {
        type: Boolean, 
        default: false
    },
    releasedAt: {
        type: Date, 
        required: 'releasedAt is mandatory field'
    },

}, {timestamps: true});

const Book_Model = mongoose.model('Book_Model', bookSchema);

module.exports = Book_Model;