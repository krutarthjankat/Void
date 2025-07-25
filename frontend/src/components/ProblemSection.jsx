import { useState } from "react";
import ProblemCard from "./ProblemCard";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
  },
  {
    id: 6,
    title: "Container With Most Water",
    difficulty: "Medium",
  },
];

const ProblemSection = () => {
  const filteredProblems = problems;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Practice Problems
            </h2>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No problems found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemSection;
