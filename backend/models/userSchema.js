import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must be Atleast 3 Character!😒"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must be Atleast 3 Character!😒"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a Valid Email!🤬"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number must contain Exact 10 Digits!😊"],
    maxLength: [10, "Phone Number must contain Exact 10 Digits!😊"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [5, "Nic Must be contain 5 Digits!😊"],
    maxLength: [5, "Nic Must contain 5 Digits!😊"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is Required!😊"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    minLength: [3, "Password Must be Contain Atleast 3 Digits!😊"],
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH.
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

export const User = mongoose.model("User", userSchema);
