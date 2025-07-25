import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  getcurUserdetails,
  getUserbyID,
  logoutUser,
  verifyToken,
  loginUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/verify-token").get(verifyToken);

router.route("/getuserbyId/:UserID").get(getUserbyID);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/get-current-user").get(verifyJWT, getcurUserdetails);

export default router;
