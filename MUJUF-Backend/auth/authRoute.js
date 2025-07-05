import express, { Router } from "express";
import {
  getSignupOtp,
  resetPassword,
  signInController,
  signoutController,
  singupController,
  updateProfile,
  verifyResetPassword,
} from "./authController.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sendotp", getSignupOtp);
router.post("/signup", singupController);
router.post("/signin", signInController);
router.get("/signout", signoutController);
router.post("/resetpassword", resetPassword);
router.put("/newpassword", verifyResetPassword);
router.put("/update-profile", protectRoute, updateProfile)

export default router;
