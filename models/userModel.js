const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      min: 3,
      max: 10,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User must have a email"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Email is not correct",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      min: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "User must have confirm password"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Please validate your password",
      },
    },
    avatar: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.isNew) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;

  return;
});

userSchema.methods.correctPassword = async function (
  passwordField,
  correctPassword,
) {
  return await bcrypt.compare(passwordField, correctPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
