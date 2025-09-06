import mongoose from "mongoose";

const generatedPasswordSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    generatedPasswords: {
        type: [generatedPasswordSchema],
        default: []
    }
});

export const User = mongoose.model("User", userSchema);
