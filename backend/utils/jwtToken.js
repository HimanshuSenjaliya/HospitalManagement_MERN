export const generateToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie(cookieName, token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
