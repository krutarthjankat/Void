import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}
import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

export {connectToDb};
