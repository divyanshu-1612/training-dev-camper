const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, `name is required`],
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "minlengt is 8"],
        resetPasswordToken: String,
        resetPasswordExpireDate: Date,
        createdAt: {
            Date,
            default: Date.now
        },
        select: false
    }
});

// Sample Encryptor (Just Reversing The Password String)
// Don't Use Arrow Function Here
userSchema.pre("save", async function(next) {
    this.password = this.password.split("").reverse().join("");
});

// Sign Jwt And Return, Method
userSchema.methods.getSignedJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPDATE
    });
};

// Validate Password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return new Promise((resolve, reject) => {
        enteredPassword = enteredPassword.split("").reverse().join("");
        resolve(enteredPassword === this.password);
    });
};

module.exports = mongoose.model("userModel", userSchema);
