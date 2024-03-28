import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, dob, phone, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !dob ||
    !phone ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill Full Details!🙏🙏", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!😊", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    dob,
    phone,
    nic,
    role: "Patient",
  });

  generateToken(user, 200, res, "Patient Registered SuccessFully! 🎉");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Details!😊", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password don't Match!😒", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!😒😒", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email!😒😒", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User With this role is not Found!😂😂", 400));
  }

  generateToken(user, 200, res, "User Login SuccessFully!🎉🎉");
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, dob, phone, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !dob ||
    !phone ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill Full Details!🙏🙏", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} Admin With This Email Already Exists!🤣🤣`
      )
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    dob,
    phone,
    nic,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!🎉🎉",
    admin
  });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  // console.log(doctors);
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Log Out Successfully!🎉🎉",
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logout Successfully!🎉🎉",
    });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!🙏🙏", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Allowed!🤦‍♂️🤦‍♂️", 400));
  }

  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    dob,
    phone,
    nic,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !dob ||
    !phone ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Fill Full Details!🙏🙏", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email!😊😊`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    dob,
    phone,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered!🎉🎉",
    doctor,
  });
});
