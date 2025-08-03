import { Router } from "express";
import { reviewCode } from "../controllers/aiReviewController.js";

const router = Router();
router.route("/review").post(reviewCode);
export default router;
