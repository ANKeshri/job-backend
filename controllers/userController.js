import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { User } from '../models/user.js';
import ErrorHandler from '../middlewares/error.js';

import { sendtoken } from '../utils/jwtToken.js';

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler('Please enter all fields', 400));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler('Email already exists', 400));
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role
    });
    // const token = user.getJWTToken();
    sendtoken(user, 200, res, 'User registered successfully');
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler('Please enter all fields', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
    const isPasswordMatched = await user.changePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
    if (user.role !== role) {
        return next(new ErrorHandler('User with this role is not found', 400));
    }
    sendtoken(user, 200, res, 'User logged in successfully');
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: 'Logged out successfully',
    });
});
export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});