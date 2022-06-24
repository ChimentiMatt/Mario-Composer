const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { Schema } = mongoose
const { ObjectID } = Schema.Types

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


userSchema.statics.signup = async function(username, password, email) {
    const user = new this()
    user.username = username
    user.hashPassword(password)
    user.email = email

    await user.save()
    return user
}

userSchema.methods.hashPassword = function(plainText) {
    this.password = bcrypt.hashSync(plainText, 4)
}

userSchema.methods.sanitize = function() {
    return {
        ...this._doc,
        password: undefined,
    }
}

userSchema.methods.comparePassword = function(plainText) {
    return bcrypt.compareSync(plainText, this.password)
} 

const User = mongoose.model("User", userSchema)
module.exports = User


