import userRoute from "./routes/user.routes.js";
// import probRoute from "./routes/problem.routes.js";
// import submissionRoute from "./routes/submission.routes.js";
import { connectToDb } from "./database/connectToDb.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

connectToDb();

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://krutarthjankat.github.io",
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(cors());

app.use("/api/user", userRoute);
// app.use("/api/v1/problem", probRoute);
// app.use("/api/v1/submission", submissionRoute);
app.get("/", (req, res) => {
  res.send("Sab badhiya");
});
app.listen(process.env.PORT);
