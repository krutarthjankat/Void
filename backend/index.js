import userRoute from "./routes/user.routes.js";
import probRoute from "./routes/problem.routes.js";
import submissionRoute from "./routes/submission.routes.js";
import compileRouter from "./routes/compiler.route.js";
import aiReviewRoutes from "./routes/aiReview.route.js";
import { connectToDb } from "./database/connectToDb.js";
import { ApiError } from "./utils/ApiError.js";
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

connectToDb();

const tempDir = path.join("temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use("/api/user", userRoute);

app.use("/api/problem", probRoute);

app.use("/api/submission", submissionRoute);

app.use("/api/code", compileRouter);

app.use("/api/ai", aiReviewRoutes);

// app.use((err, req, res, next) => {
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json(err);
//   }
//   console.error("Unhandled error:", err); // 👈 log unexpected errors
//   return res.status(500).json({
//     statusCode: 500,
//     data: null,
//     message: "Internal Server Error",
//     success: false,
//     errors: [err?.message || String(err)],
//   });
// });


app.get("/", (req, res) => {
  res.send("Sab badhiya");
});

app.listen(process.env.PORT);
