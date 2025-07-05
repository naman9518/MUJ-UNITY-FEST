import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import CustomError from "./customError.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new CustomError("Unauthorized! Please login.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(new CustomError("Invalid or Expired Token. Please login again.", 401));
  }
});

export default protectRoute;
