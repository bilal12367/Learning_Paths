const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: 4, message: "First Name Should atleast contain 4 characters." },
    lastName: { type: String, required: true, minLength: 4, message: "Last Name Should atleast contain 4 characters." },
    email: { type: String, validate: { validator: (val) => validator.isEmail(val), message: "Invalid Email" }, required: true, unique: true },
    password: { type: String, validate: { validator: (val) => validator.isStrongPassword(val), message: "Password is weak" }, required: true },
    role: {type: String, enum: {
        values: ["USER","ADMIN"],
        message: '{VALUE} is not supported'
    }}
}, { timestamps: true })

UserSchema.pre('save', function(next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next()
})

UserSchema.methods.createJwt = function() {
    return jwt.sign({userId: this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("Users", UserSchema);

