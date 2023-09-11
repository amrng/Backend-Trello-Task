import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      minLength: [3, "Min length 3"],
      maxLength: [8, "Max length 8"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["user", "manager"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
