// controllers/aiController.js
import axios from "axios";

export const reviewCode = async (req, res) => {
  const { code, title, statement, constraints, sampleInputs, sampleOutputs } =
    req.body;

  const prompt = `
You're an AI assistant helping users solve coding problems.

Problem Title: ${title}
Problem Statement: ${statement}
Constraints: ${constraints?.join("\n") || "None"}
Sample Inputs: ${sampleInputs?.join("\n") || "None"}
Sample Outputs: ${sampleOutputs?.join("\n") || "None"}

User Code:
${code}

---

Please:
1. Review the user's code. Mention any bugs, optimizations, or improvements.
2. Then, provide a subtle helpful idea to solve the problem (no direct solutions!).
3. Talk in second person language. 

Label your response clearly:
Review:
<your review>

Hint:
<your hint>
`;
//   console.log(prompt);

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response.";
    // console.log(reply);
    res.json({ data: reply });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate review." });
  }
};
