import { useNavigate } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/problem/${problem._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {problem.title}
          </h3>
          {problem.tags && problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {problem.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
