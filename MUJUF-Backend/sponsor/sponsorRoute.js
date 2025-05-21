import express from "express";
import sponsorController from "./sponsorController.js";

const router = express.Router();

router.post("/", sponsorController);

export default router;
