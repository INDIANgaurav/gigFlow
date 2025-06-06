const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
    },

    password: {
      type: String,
      required: true,
    } 
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
