import { Router } from "express";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import {
  createProblem,
  getProblems,
  deleteProblem,
  getProblemById
} from "../controllers/problem.controller.js";

const router = Router();

router.route("/create").post(requireAdmin, createProblem);

router.route("/getall").get(getProblems);

router.route("/delete").post(requireAdmin, deleteProblem);

router.route("/:id").get(getProblemById);

export default router;
