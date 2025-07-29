import Submission from "../models/submission.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const simulateJudge = async (code, expectedOutput = "Hello, World!") => {
  if (code.includes("Hello")) return { verdict: "Accepted" };
  return { verdict: "Wrong Answer" };
};

export const submitCode = asyncHandler(async (req, res) => {
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

  return res
    .status(201)
    .json(new ApiResponse(201, submission, "Submission judged"));
});

export const getUserSubmissions = asyncHandler(async (req, res) => {
  const uid = req.user.userId;
  const submissions = await Submission.find({ uid }).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, submissions));
});

export const getSubmissionByUser = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const sub = await Submission.find({ uid });
  if (sub.uid !== req.user.userId) {
    throw new ApiError(403, "Unauthorized access");
  }
  return res.json(new ApiResponse(200, sub));
});

export const getSubmissionsByProblem = asyncHandler(async (req, res) => {
  const { pid } = req.body;
  const submissions = await Submission.find({ pid }).sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, submissions));
});
