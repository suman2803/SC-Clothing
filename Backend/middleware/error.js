const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode =  err.statusCode || 500;
    err.message = err.message || "Internel Server Error";


//Wrong Mongodb ID error
if(err.name === "CastError"){
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400);
}


//Mongoose duplicate key error

if(err.code === 11000 ){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
}

//Wrong JWT error

if(err.name === "JWTWebTokenError"){
    const message = `JSON Web Token is invalid ,Try again`;
    err = new ErrorHandler(message,400);
}


//JWT Expire error
if(err.name === "TokenExpiredError"){
    const message = `JSON Web Token is Expired ,Try again`;
    err = new ErrorHandler(message,400);
}

    res.status(err.statusCode).json({
        success:false,
       message:err.message
    });

};