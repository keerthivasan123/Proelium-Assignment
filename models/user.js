var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        middleName: {
            type: String,
            maxlength: 32,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "USER"
        },
        department: {
            type: String,
            maxlength: 32,
            trim: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
