const AppError = require('../utils/appError');


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).send({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
        console.log(err.path);
}

const sendErrorProd = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    })
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    
    
    if(process.env.NODE_ENV == 'development') {
        sendErrorDev(err, res);
    }else if(process.env.NODE_ENV == 'production') {
        sendErrorProd(err, res);

    }
}