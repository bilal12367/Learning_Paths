import mongoose, { Schema } from "mongoose";
import { IUser } from "../util/types/AuthTypes";
import validator from "validator";


const userSchema = new Schema<IUser>({
    email: { type: String, validate: validator.isEmail, required: true, unique: true },
    password: { type: String, validate: validator.isStrongPassword, required: true },
    fullName: { type: String, min: 5, max: 40, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, min: 10, max: 110, required: true },
    role: { type: String },
    userName: { type: String, min: 4, unique: true, required: true }
})

export default mongoose.model('User', userSchema);