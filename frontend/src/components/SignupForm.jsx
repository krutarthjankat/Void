import axios from "axios";
import { baseurl } from "../App.jsx";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    emailid: "",
    mobno: "",
    password: "",
  });
  const navigate = useNavigate();
  const control = useAnimationControls();
  const control2 = useAnimationControls();
  const [type, setType] = useState("password");

  useEffect(() => {
    control2.start({
      width: ["100%", "50%"],
      transition: {
        times: [0, 1],
        duration: 0.4,
      },
    });
  }, [control2]);
  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const checkSignUp = async (e) => {
    e.preventDefault();
    control.start({
      scale: [0, 15],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.4,
      },
    });
    try {
      const res = await axios.post(baseurl + "api/users/signup", form);
      if (res.data.status === "success") {
        setUser(res.data.data);
        navigate(`/`);
      } else {
        control.start({
          scale: [15, 0],
          transition: {
            times: [0, 1],
            ease: "easeInOut",
            duration: 0.4,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <!-- component -->
    <AnimatePresence mode="wait">
      <div className="min-w-screen min-h-screen flex justify-start">
        <div className="w-full sm:w-1/2 flex items-center justify-center bg-[#030712]">
          <div className="flex justify-center items-center w-full sm:w-1/2 bg-[#030712] ">
            {/* <!-- component --> */}
            <div className="min-h-screen flex flex-col items-center justify-center w-full ">
              <div className="flex flex-col bg-white shadow-md px-4 gap-5 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md rounded-2xl w-full ">
                <div className="font-medium self-center text-center text-xl sm:text-2xl uppercase text-gray-800">
                  Signup
                </div>
                <hr />
                <div className="mt-2">
                  <form onSubmit={checkSignUp}>
                    <div className="flex flex-col mb-6">
                      <label
                        for="name"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 px-2 md:px-0"
                      >
                        Name:
                      </label>
                      <div className="relative px-2 md:px-0">
                        <input
                          type="text"
                          onChange={updateFormField}
                          value={form.name}
                          name="name"
                          id="name"
                          required
                          autoComplete="off"
                          className="text-sm sm:text-base placeholder-gray-500 px-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        for="emailid"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 px-2 md:px-0 "
                      >
                        Email ID:
                      </label>

                      <div className="relative px-2 md:px-0 focus:border-5">
                        <input
                          type="email"
                          onChange={updateFormField}
                          value={form.emailid}
                          name="emailid"
                          id="emailid"
                          required
                          autoComplete="off"
                          className="text-sm sm:text-base placeholder-gray-500 px-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder="johndoe@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mb-6">
                      <label
                        for="mobno"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 px-2 md:px-0 "
                      >
                        Mobile No:
                      </label>

                      <div className="relative px-2 md:px-0 focus:border-5">
                        <input
                          type="number"
                          onChange={updateFormField}
                          value={form.mobno}
                          name="mobno"
                          id="mobno"
                          required
                          autoComplete="off"
                          className="text-sm sm:text-base placeholder-gray-500 px-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder="95135XXXXX"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mb-6">
                      <label
                        for="password"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 px-2 md:px-0 "
                      >
                        Password:
                      </label>

                      <div className="relative px-2 md:px-0 focus:border-5">
                        <input
                          type={type}
                          onChange={updateFormField}
                          value={form.password}
                          name="password"
                          id="password"
                          required
                          autoComplete="off"
                          className="text-sm sm:text-base placeholder-gray-500 px-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder="Password"
                        />
                        {type === "text" && (
                          <span
                            className={`fa-solid fa-eye inline-flex items-center justify-center absolute right-1 top-0 h-full w-10`}
                            style={{ color: "#2264a6" }}
                            onClick={handleToggle}
                          ></span>
                        )}
                        {type === "password" && (
                          <span
                            className={`fa-solid fa-eye-slash inline-flex items-center justify-center absolute right-1 top-0 h-full w-10`}
                            style={{ color: "#2264a6" }}
                            onClick={handleToggle}
                          ></span>
                        )}
                      </div>
                    </div>

                    <div className="flex w-full px-2 md:px-0">
                      <button
                        type="submit"
                        id="login"
                        className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#005ab3] hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                      >
                        <span className="mr-2 uppercase">Sign Up</span>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <div className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                    <button
                      onClick={() => {
                        control2.start({
                          width: `100vw`,
                          transition: {
                            duration: 0.4,
                          },
                        });
                        setTimeout(() => {
                          navigate("/login");
                        }, 1000);
                      }}
                    >
                      <span className="ml-2">
                        Already have an account? Login
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          animate={control2}
          initial={{ width: "100%" }}
          className="sm:rotate(90deg) hidden h-screen absolute sm:flex w-1/2 flex-col justify-center right-0 top-0 items-center bg-left bg-auto bg-cover bg-[url(/src/assets/bg.jpg)] bg-no-repeat z-[50]"
        >
          {/* <div className="w-48 md:w-64 lg:w-72">
            <img className="object-contain" src={logo} alt="IIT BBS" />
          </div> */}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
