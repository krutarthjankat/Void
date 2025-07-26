import userRoute from "./routes/user.routes.js";
import probRoute from "./routes/problem.routes.js";
import submissionRoute from "./routes/submission.routes.js";
import { connectToDb } from "./database/connectToDb.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

connectToDb();

app.use(cors());

app.use("/api/user", userRoute);

app.use("/api/problem", probRoute);

app.use("/api/submission", submissionRoute);

app.get("/", (req, res) => {
  res.send("Sab badhiya");
});

app.listen(process.env.PORT);
