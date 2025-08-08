import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user,setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {    
    try{
      const res = await axios.post(
        import.meta.env.VITE_baseurl + "api/user/update",
        {
          name: editedUser.name,
          mobno: editedUser.mobno,
          emailid: editedUser.emailid,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      console.log(res.data.data);
      setUser(res.data.data);
      setIsEditing(false);
    }catch(e){
      console.log(e);
    }
    
    // Add API call here if needed
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] px-4 py-8">
      <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-xl shadow-md p-6 sm:p-8 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          User Profile
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {user?.user?.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="emailid"
                value={editedUser.emailid}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {user?.user?.emailid}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="mobno"
                value={editedUser.mobno}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {user?.user?.mobno}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <p className="text-gray-500 dark:text-gray-400 italic">
              ●●●●●●●● (hidden)
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedUser(user);
                }}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
