import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Problem } from "../models/problem.model.js";

export const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    statement,
    test_input,
    test_output,
    sampleInputs,
    sampleOutputs,
    constraints,
    tags,
    user,
  } = req.body;

  const problem = await Problem.create({
    title,
    statement,
    test_input,
    test_output,
    sampleInputs,
    sampleOutputs,
    constraints,
    tags,
    user,
  });

  res.status(201).json(new ApiResponse(201, problem, "Problem created"));
});

export const getProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find().sort({ createdAt: -1 });
  res.json(new ApiResponse(200, problems));
});

export const getProblemById = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) throw new ApiError(404, "Problem not found");

  res.json(new ApiResponse(200, problem));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) throw new ApiError(404, "Problem not found");

  if (problem.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Not authorized to update this problem");
  }

  const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(new ApiResponse(200, updated, "Problem updated"));
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const problem = await Problem.findById(_id);
  if (!problem) throw new ApiError(404, "Problem not found");

  if (problem.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Not authorized to delete this problem");
  }

  await problem.deleteOne();
  res.json(new ApiResponse(200, null, "Problem deleted"));
});
