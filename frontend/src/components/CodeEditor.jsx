import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "./Loader";

const languageMap = {
  cpp: "#include<iostream>\nusing namespace std;\nint main() {\n  int a; cin >> a;\n  cout << a * 3;\n  return 0;\n}",
  python: "a = int(input())\nprint(a * 3)",
  java: "import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    System.out.println(a * 3);\n  }\n}",
};

const CodeEditor = ({ pid, user }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageMap["cpp"]);
  const [input, setInput] = useState("5");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("latest_code", code);
    localStorage.setItem("latest_lang", language);
  }, [code, language]);

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post(import.meta.env.VITE_baseurl + "api/code/run", {
        language,
        code,
        input,
      });
      setOutput(res.data.data.output);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || "Something went wrong!";
      setOutput("Error:\n" + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post(
        import.meta.env.VITE_baseurl + "api/submission/submit",
        {
          pid,
          language,
          code,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
          withCredentials: true,
        }
      );
      console.log(res.data.data.verdict);
      setOutput(res.data.data.verdict || "Submitted");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || "Submission Failed!";
      setOutput("Error:\n" + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 bg-white rounded-xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Language Select + Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="font-semibold text-sm">Select Language:</label>
          <select
            value={language}
            onChange={(e) => {
              const lang = e.target.value;
              setLanguage(lang);
              setCode(languageMap[lang]);
            }}
            className="p-2 border rounded-md w-full md:w-40 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={handleRun}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            {loading ? "Running..." : "Run Code"}
          </motion.button>
          {user ? (
            <motion.button
              onClick={handleSubmit}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Code Editor
        </label>
        <motion.textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const textarea = textareaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;

              const updatedCode =
                code.substring(0, start) + "    " + code.substring(end);
              setCode(updatedCode);

              requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
              });
            }
          }}
          rows={12}
          className="w-full font-mono text-sm p-4 border rounded-md resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        />
      </div>

      {/* Input */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Input (stdin)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full font-mono text-sm p-4 border rounded-md resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter input"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Output
        </label>
        <motion.div
          className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-[150px] overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            <pre>{output}</pre>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;
