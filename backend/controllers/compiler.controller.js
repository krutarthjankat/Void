import { runCpp } from "../compilers/cpp.js";
import { runPython } from "../compilers/python.js";
import { runJava } from "../compilers/java.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const languageMap = {
  cpp: runCpp,
  python: runPython,
  java: runJava,
};

export const compileCode = asyncHandler(async (req, res) => {
  const { language, code, input = "" } = req.body;

  if (!code || !language) throw new ApiError(400, "Missing code or language");
  const runner = languageMap[language.toLowerCase()];
  if (!runner) throw new ApiError(400, "Unsupported language");

  try {
    const output = await runner(code, input);
    res
      .status(200)
      .json(new ApiResponse(200, { output }, "Compiled successfully"));
  } catch (err) {
    console.error("Compiler error:", err); // logs error to terminal
    throw new ApiError(500, "Compilation error", [
      err?.stack || err?.message || String(err),
    ]);
  }
});
