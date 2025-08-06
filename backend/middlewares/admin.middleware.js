// middleware/requireAdmin.js
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const requireAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    // console.log(token);
    if (!user || user.role !== "admin")
      throw new ApiError(403, "Admin access denied");

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(403, "Not authorized as admin"));
  }
};
