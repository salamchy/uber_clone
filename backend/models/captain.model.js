import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength:[3, "First name must be at least 3 characters"],
    },

    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters"],
    }
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },

  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Password must be at least 8 characters"],
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters"],
    },

    plateNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: [1, "Plate number must be at least 1 characters"],
      maxlength: [15, "Plate number must be at most 15 characters"],
    },

    capacity: {
      type: Number,
      required: true,
      minlength:[1, "Capacity must be at least 1"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["motorcycle","scooty", "car"]
    }
  },

  location: {
    lat: {
      type: Number,
    },

    lng: {
      type: Number,
    }
  }

});


//generating token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });  

  return token;
};

//hashing password
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//comparing password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const captainModel = mongoose.model("captainModel", captainSchema);