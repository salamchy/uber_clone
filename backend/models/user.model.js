import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    firstName:{
      type: String,
      required: true,
      minlength:[3, "First name must be 3 characters long"],
    },
    lastName:{
      type: String,
      required: true,
      minlength:[3, "Last name must be 3 characters long"],
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be atleast 5 characters"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId : {
    type: String,
  }
});


// Add a custom method to the user schema
userSchema.methods.generateAuthToken = function() {
  // Generate a JSON Web Token (JWT) for the user
  // jwt.sign creates the token
  // 1st argument: Payload (data to include in the token, here the user's unique ID)
  // 2nd argument: Secret key used to sign the token (stored securely in environment variables)
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });

  // Return the generated token
  return token;
};


export const userModel = mongoose.model("userModel", userSchema);
