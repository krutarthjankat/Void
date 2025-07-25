const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const problemSchema = new mongoose.Schema({
  title: String,
  statement: String,
  test_input: String,
  test_output: String,
  tags: [String],
  user: String,
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
