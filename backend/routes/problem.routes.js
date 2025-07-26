import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProblem,
  getProblems,
  deleteProblem,
} from "../controllers/problemController.js";

const router = Router();

router.route("/create").post(verifyJWT, createProblem);

router.route("/getall").get(getProblems);

router.route("/delete").post(verifyJWT, deleteProblem);

export default router;
