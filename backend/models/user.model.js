import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  mobno: String,
  emailid: String,
  password: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export const User = mongoose.model("User", userSchema);
