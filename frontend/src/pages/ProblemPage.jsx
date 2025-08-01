import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import { baseurl } from "../App";

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [activeTab, setActiveTab] = useState("problem"); // "problem" or "submissions"
  const [submissions, setSubmissions] = useState([]);

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
      console.log(res.data.data);
      setSubmissions(res.data.data || []);
    } catch (err) {
      console.error("Failed to load submissions", err);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  useEffect(() => {
    if (activeTab === "submissions") {
      fetchSubmissions();
    }
  }, [activeTab]);

  if (!problem) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Tab Selector */}
        <div className="flex space-x-4 border-b">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "problem"
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("problem")}
          >
            Problem
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "submissions"
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "problem" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Problem Details */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 overflow-auto max-h-[90vh]">
              <h1 className="text-2xl font-bold text-blue-700">
                {problem.title}
              </h1>

              <p className="text-gray-700 text-sm">{problem.statement}</p>

              {problem.constraints?.length > 0 && (
                <div>
                  <h2 className="text-md font-semibold mt-4 text-gray-800">
                    Constraints
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="text-md font-semibold mt-4 text-gray-800">
                  Sample Inputs
                </h2>
                <div className="space-y-2">
                  {problem.sampleInputs?.map((input, idx) => (
                    <pre
                      key={idx}
                      className="bg-gray-100 border rounded p-2 text-sm font-mono"
                    >
                      {input}
                    </pre>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-md font-semibold mt-4 text-gray-800">
                  Sample Outputs
                </h2>
                <div className="space-y-2">
                  {problem.sampleOutputs?.map((output, idx) => (
                    <pre
                      key={idx}
                      className="bg-gray-100 border rounded p-2 text-sm font-mono"
                    >
                      {output}
                    </pre>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Code Editor */}
            <div>
              <CodeEditor pid={id} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Submissions
            </h2>
            {submissions.length === 0 ? (
              <p className="text-gray-600">No submissions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Language</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-2">{s.language}</td>
                        <td className="p-2 text-green-700 font-semibold">
                          {s.verdict}
                        </td>

                        <td className="p-2">
                          {new Date(s.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPage;
