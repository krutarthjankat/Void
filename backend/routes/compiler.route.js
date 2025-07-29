import { Router } from "express";
import { compileCode } from "../controllers/compiler.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/run").post(compileCode);

export default router;
