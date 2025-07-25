const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const submissionSchema = new mongoose.Schema({
  uid: String,
  pid: String,
  verdict: String,
  code: String,
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
