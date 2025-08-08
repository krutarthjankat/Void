import { useState, useEffect } from "react";
import axios from "axios";
import ProblemCard from "./ProblemCard";

const ProblemSection = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_baseurl+"api/problem/getall");
        setProblems(res.data.data);
      } catch (err) {
        console.error("Failed to fetch problems", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <section className="py-16 px-4 bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Practice Problems
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Loading...
          </p>
        ) : problems.length > 0 ? (
          <div className="grid gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem._id || problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-gray-300">
              No problems found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemSection;
