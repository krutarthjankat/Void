import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  submitCode,
  getUserSubmissions,
  getSubmissionByUser,
  getSubmissionsByProblem,
} from "../controllers/submissionController.js";

const router = Router();

router.route("/submit").post(verifyJWT, submitCode);

router.route("/getall").get(getUserSubmissions);

router.get("/getbyuser").post(verifyJWT, getSubmissionByUser);

router.route("/getbyproblem").post(getSubmissionsByProblem);

export default router;
