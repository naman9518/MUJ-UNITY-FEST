import express, { Router } from "express";
import {
  getSignupOtp,
  resetPassword,
  signInController,
  signoutController,
  singupController,
  verifyResetPassword,
} from "./authController.js";

const router = express.Router();

router.post("/sendotp", getSignupOtp);
router.post("/signup", singupController);
router.post("/signin", signInController);
router.get("/signout", signoutController);
router.post("/resetpassword", resetPassword);
router.put("/newpassword", verifyResetPassword);

export default router;
