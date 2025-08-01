import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    pid: { type: String, required: true },
    language: { type: String },
    verdict: { type: String, default: "Pending" },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);
