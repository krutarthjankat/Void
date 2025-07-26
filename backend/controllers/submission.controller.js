const Submission = require("../models/Submission");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const simulateJudge = async (code, expectedOutput = "Hello, World!") => {
  if (code.includes("Hello")) return { verdict: "Accepted" };
  return { verdict: "Wrong Answer" };
};

const submitCode = asyncHandler(async (req, res) => {
  const { pid, code } = req.body;
  const uid = req.user.userId;

  if (!pid || !code) {
    throw new ApiError(400, "Problem ID and code are required");
  }

  const submission = await Submission.create({
    uid,
    pid,
    code,
    verdict: "Pending",
  });

  const result = await simulateJudge(code);
  submission.verdict = result.verdict;
  await submission.save();

  res.status(201).json(new ApiResponse(201, submission, "Submission judged"));
});

const getUserSubmissions = asyncHandler(async (req, res) => {
  const uid = req.user.userId;
  const submissions = await Submission.find({ uid }).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, submissions));
});

const getSubmissionByUser = asyncHandler(async (req, res) => {
  const {uid} = req.body;  
  const sub = await Submission.find({uid});
  if (sub.uid !== req.user.userId) {
    throw new ApiError(403, "Unauthorized access");
  }
  res.json(new ApiResponse(200, sub));
});

const getSubmissionsByProblem = asyncHandler(async (req, res) => {
  const { pid } = req.body;
  const submissions = await Submission.find({ pid }).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, submissions));
});

module.exports = {
  submitCode,
  getUserSubmissions,
  getSubmissionByUser,
  getSubmissionsByProblem,
};
