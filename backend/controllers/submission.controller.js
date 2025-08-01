import { Submission } from "../models/submission.model.js";
import { Problem } from "../models/problem.model.js";
import { runCpp } from "../compilers/cpp.js";
import { runPython } from "../compilers/python.js";
import { runJava } from "../compilers/java.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const languageMap = {
  cpp: runCpp,
  python: runPython,
  java: runJava,
};

// 1. SUBMIT CODE
export const submitCode = asyncHandler(async (req, res) => {
  const { pid, code, language } = req.body;
  const uid = req.user._id;
  if (!pid || !code || !language) {
    throw new ApiError(400, "Problem ID, code, and language are required");
  }

  const problem = await Problem.findById(pid);
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const submission = await Submission.create({
    uid,
    pid,
    language,
    code,
    verdict: "Pending",
  });

  const runner = languageMap[language.toLowerCase()];
  if (!runner) throw new ApiError(400, "Unsupported language");

  let allPassed = true;

  for (let i = 0; i < problem.test_input.length; i++) {
    const input = problem.test_input[i];
    const expectedOutput = problem.test_output[i];

    try {
      const output = await runner(code, input);
      if (output.trim() !== expectedOutput.trim()) {
        allPassed = false;
        break;
      }
    } catch (err) {
      allPassed = false;
      break;
    }
  }

  submission.verdict = allPassed ? "Accepted" : "Wrong Answer";
  await submission.save();

  return res
    .status(201)
    .json(new ApiResponse(201, submission, "Submission judged"));
});

// 2. GET SUBMISSIONS OF LOGGED-IN USER
export const getUserSubmissions = asyncHandler(async (req, res) => {
  const uid = req.user.userId;
  const submissions = await Submission.find({ uid }).sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, submissions));
});

// 3. GET SUBMISSIONS BY USER (ADMIN or SELF)
export const getSubmissionByUser = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  if (!uid || uid !== req.user.userId) {
    throw new ApiError(403, "Unauthorized access");
  }

  const subs = await Submission.find({ uid }).sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, subs));
});

// 4. GET SUBMISSIONS BY PROBLEM
export const getSubmissionsByProblem = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const submissions = await Submission.find({ pid }).sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, submissions));
});
