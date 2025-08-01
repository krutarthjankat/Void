import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  submitCode,
  getUserSubmissions,
  getSubmissionByUser,
  getSubmissionsByProblem,
} from "../controllers/submission.controller.js";

const router = Router();

router.route("/submit").post(verifyJWT, submitCode);

router.route("/getall").get(getUserSubmissions);

router.route("/problem/:pid").get(getSubmissionsByProblem);

router.route("/getbyuser").post(verifyJWT, getSubmissionByUser);

export default router;
