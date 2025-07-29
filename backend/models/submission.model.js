import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    pid: { type: String, required: true },
    verdict: { type: String, default: "Pending" },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default { Submission };
