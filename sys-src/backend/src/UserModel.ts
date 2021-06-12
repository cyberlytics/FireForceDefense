import mongoose from 'mongoose';

export const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
    })
);
