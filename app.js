const express = require('express');
const dotenv = require('dotenv');
const user = require('./Routes/userRouter');
const book = require('./Routes/bookRouter');
const review = require('./Routes/reviewRouter');
const { urlencoded } = require('express');
const AppError = require('./utils/appError');
const globalErrorController = require('./Controller/errorControllr');


const app = express();
app.use(express.json());

dotenv.config({
    path: './config.env'
})

app.use('/', user);
app.use('/', book);
app.use('/', review);

app.all('*', (req, res,next ) => {
    
    // const err = new Error(`Can't find ${req.originalUrl} to this server`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} to this server`, 404));
})  

app.use(globalErrorController);

module.exports = app;