import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProblem,
  getProblems,
  deleteProblem,
  getProblemById
} from "../controllers/problem.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createProblem);

router.route("/getall").get(getProblems);

router.route("/delete").post(verifyJWT, deleteProblem);

router.route("/:id").get(getProblemById);

export default router;
