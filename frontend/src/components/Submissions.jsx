import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../App.jsx";

const Submissions = ({ pid }) => {
  const [submissions, setSubmissions] = useState([]);
  console.log(pid);
  useEffect(() => {
    const fetchSubs = async () => {
      const res = await axios.get(`${baseurl}api/submission/problem/${pid}`);
      setSubmissions(res.data.data);
    };
    fetchSubs();
  }, [pid]);

  if (!submissions.length) return <div>No submissions found.</div>;

  return (
    <div className="overflow-x-auto border rounded-md p-4">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Language</th>
            <th className="px-4 py-2">Verdict</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{sub.uid}</td>
              <td className="px-4 py-2">{sub.language}</td>
              <td className="px-4 py-2">{sub.verdict}</td>
              <td className="px-4 py-2">
                {new Date(sub.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
