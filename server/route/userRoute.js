import express, { Router } from "express";
import {
  singupController,
  signInController,
  getSignupOtp,
  resetPassword,
  verifyResetPassword,
} from "../controller/userController.js";
const router = express.Router();
//otp verification
router.route("/auth/getotp").post(getSignupOtp);
router.post("/auth/signup", singupController);
router.post("/auth/", signInController);
router.post("/auth/resetpassword", resetPassword);
router.put("/auth/resetpassword", verifyResetPassword);
export default router;
