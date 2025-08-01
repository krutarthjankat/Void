import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  statement: String,
  test_input: [String],
  test_output: [String],
  tags: [String],
  user: String,
  constraints: [String],
  sampleInputs: [String],
  sampleOutputs: [String],
});

export const Problem = mongoose.model("Problem", problemSchema);
