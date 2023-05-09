const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const  jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please Login to access the resources",401));
    }

 
    const decodedData = jwt.verify(token,process.env.JWTSECRET);
    req.user = await User.findById(decodedData.id);
    next();


   });

exports.authorizeRoles = (...roles) =>{
    return(req,res,next) =>{

    //IF NOT ADMIN then it means  is user 
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler (
            `Role: ${req.user.role} is not allowed to access this resource`,
            403,
        ));
    }
        next();
    }
};