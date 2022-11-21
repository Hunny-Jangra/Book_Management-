const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is mandatory field'],
        enum: {
            values: ['Mr', 'Mrs', 'Miss'],
            message: '{VALUE} is not supported'
          }
    },
    name: {
        type: String,
        required:[true, 'name is mandatory field'],
    },
    phone: {
        type: String,
        unique:true,
        required: 'phone i mandatory field',
        minLength: 10,
        maxLength: 10,
        validate: [validator.isMobilePhone, 'Please provide a valid Phone number']
    },
    email: {
        type: String,
        unique:true,
        required: 'Email is mandatory field',
        validate: [validator.isEmail, 'Please provide only valid email'],
        trim: true,
        lowercase: true
    },
    password: {
        type:String,
        unique:true,
        required:'password is mandatory field',
        minLength: 8,
        maxLength: 15
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: String
        }
    },
    
}, {timestamps:true});

userSchema.plugin(uniqueValidator, { message: 'Error, >>>> {PATH} <<<< to be unique.' })

const User_Model = mongoose.model('User_Model', userSchema);

module.exports = User_Model;