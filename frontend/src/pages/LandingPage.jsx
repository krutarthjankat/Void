import { motion } from "framer-motion";
import { Code, History, Settings, Sparkles} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            VoidJudge
          </span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          A modern online judge platform to practice coding, track submissions,
          and get AI-powered feedback.
        </p>
        <a
          href="/login"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Platform Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900"
            >
              <Code className="h-10 w-10 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                Multi-Language Support
              </h4>
              <p>
                Submit solutions in C++, Python, or Java with fast evaluation.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900"
            >
              <Sparkles className="h-10 w-10 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                AI-Powered Code Review
              </h4>
              <p>
                Get personalized feedback and optimization tips powered by AI.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900"
            >
              <History className="h-10 w-10 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Submission History</h4>
              <p>Track your progress and revisit past solutions anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
