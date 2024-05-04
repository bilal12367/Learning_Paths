import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define customer schema
const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true,
    match: /^[0-9]{5}$/
  }
});

// Create Customer model
export default mongoose.model('Customer', customerSchema);

