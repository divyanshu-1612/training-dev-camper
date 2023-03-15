const mongoose = require("mongoose");
const userModel = require("./../models/user.js");
const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("./../middleware/async.js");

// @ REGISTER USER
// @ POST api/v1/users/register
const registerUser = asyncHandler(async (req, res, next) => {
    const { userName, role, password } = req.body;

    const newUser = await userModel.create({
        userName,
        role,
        password
    });

    sendTokenResponse(newUser, 201, res, "User Registered !");
});

// @ LOGIN USER
// @ POST api/v1/users/login
const loginUser = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    const user = await userModel
        .findOne({ userName: userName })
        .select("+password");

    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

    sendTokenResponse(user, 200, res, 'User Validated !');
});

// @ GET TOKEN FROM MODEL, CREATE COOKIE AND SEND RESPONSE
const sendTokenResponse = (user, statusCode, res, msg) => {
    const token = user.getSignedJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie(`token`, token, options)
        .json({
            success: "True",
            msg: msg,
            token: token
        });
};

module.exports = {
    registerUser,
    loginUser
};