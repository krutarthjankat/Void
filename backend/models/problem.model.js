import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  statement: String,
  test_input: String,
  test_output: String,
  tags: [String],
  user: String,
});

const Problem = mongoose.model("Problem", problemSchema);

export default { Problem };
