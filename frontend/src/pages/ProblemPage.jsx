import CodeEditor from "../components/CodeEditor";

const ProblemPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Problem Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 overflow-auto max-h-[90vh]">
          <h1 className="text-2xl font-bold text-blue-700">
            Two Numbers Multiplied
          </h1>

          <div className="text-gray-700 text-sm">
            <p>
              Given two integers, your task is to read them from standard input
              and print their product.
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold mt-4 text-gray-800">
              Input Format
            </h2>
            <p className="text-sm text-gray-600">
              Two space-separated integers a and b.
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold mt-4 text-gray-800">
              Output Format
            </h2>
            <p className="text-sm text-gray-600">
              Print a single integer — the product a * b.
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold mt-4 text-gray-800">
              Constraints
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>
                1 ≤ a, b ≤ 10<sup>5</sup>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-md font-semibold mt-4 text-gray-800">
              Sample Input
            </h2>
            <pre className="bg-gray-100 border rounded p-2 text-sm font-mono">
              3 4
            </pre>
          </div>

          <div>
            <h2 className="text-md font-semibold mt-4 text-gray-800">
              Sample Output
            </h2>
            <pre className="bg-gray-100 border rounded p-2 text-sm font-mono">
              12
            </pre>
          </div>
        </div>

        {/* Right: Code Editor */}
        <div>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
