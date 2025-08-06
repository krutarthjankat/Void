import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import { baseurl } from "../App";

const ProblemPage = ({user}) => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("problem");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState("");
  console.log(user);
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`${baseurl}api/problem/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
      setProblem(res.data.data);
    } catch (err) {
      console.error("Failed to load problem", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${baseurl}api/submission/problem/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
      console.log(res.data);
      setSubmissions(res.data.data);
    } catch (err) {
      console.error("Failed to load submissions", err);
    }
  };

  useEffect(() => {
    fetchProblem();
    fetchSubmissions();
  }, [id]);

  const handleAIReview = async () => {
    setReviewLoading(true);
    setReviewResult("");
    try {
      const res = await axios.post(
        `${baseurl}api/ai/review`,
        {
          code: localStorage.getItem("latest_code") || "",
          title: problem.title,
          statement: problem.statement,
          constraints: problem.constraints || [],
          sampleInputs: problem.sampleInputs || [],
          sampleOutputs: problem.sampleOutputs || [],
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      console.log(res.data);
      setReviewResult(res.data.data);
    } catch (err) {
      console.error("Review error", err);
      setReviewResult("AI failed to generate review.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (!problem) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Tabs and Content */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md space-y-4 overflow-auto max-h-[90vh]">
          {/* Tabs */}
          <div className="flex space-x-4 border-b dark:border-gray-600 pb-2">
            {["problem", "submissions", "ai"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-t text-sm font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "problem"
                  ? "Problem"
                  : tab === "submissions"
                  ? "Submissions"
                  : "AI Review"}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {activeTab === "problem" && (
            <>
              <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {problem.title}
              </h1>

              <div className="text-gray-700 dark:text-gray-300 text-sm">
                <p>{problem.statement}</p>
              </div>

              <div>
                <h2 className="text-md font-semibold mt-4 text-gray-800 dark:text-gray-200">
                  Constraints
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {problem.constraints?.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-md font-semibold mt-4 text-gray-800 dark:text-gray-200">
                  Sample Inputs
                </h2>
                <div className="space-y-2">
                  {problem.sampleInputs?.map((input, idx) => (
                    <pre
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded p-2 text-sm font-mono text-gray-800 dark:text-gray-100"
                    >
                      {input}
                    </pre>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-md font-semibold mt-4 text-gray-800 dark:text-gray-200">
                  Sample Outputs
                </h2>
                <div className="space-y-2">
                  {problem.sampleOutputs?.map((output, idx) => (
                    <pre
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded p-2 text-sm font-mono text-gray-800 dark:text-gray-100"
                    >
                      {output}
                    </pre>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "submissions" && (
            <div>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                Your Submissions
              </h2>
              {submissions.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No submissions yet.
                </p>
              ) : (
                <ul className="space-y-3 text-sm">
                  {submissions.map((sub, idx) => (
                    <li
                      key={idx}
                      className="border dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col"
                    >
                      <div>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`${
                            sub.verdict === "Accepted"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {sub.verdict}
                        </span>
                      </div>
                      <div>
                        <strong>Language:</strong> {sub.language}
                      </div>
                      <div>
                        <strong>Time:</strong>{" "}
                        {new Date(sub.createdAt).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "ai" && (
            <div>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                AI Code Review & Hints
              </h2>

              <button
                onClick={handleAIReview}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Generate Review
              </button>

              {reviewLoading ? (
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  Reviewing your code...
                </p>
              ) : (
                <pre className="bg-gray-100 dark:bg-gray-800 mt-4 p-4 rounded whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
                  {reviewResult ||
                    "Click 'Generate Review' to get AI feedback and hints."}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Right: Code Editor */}
        <div>
          <CodeEditor pid={id} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
