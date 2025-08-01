import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import MainLayout from "./components/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProblemSection from "./components/ProblemSection";

export const baseurl = "http://localhost:3000/";

function App() {
  const [user, setUser] = useState();

  const verifyUser = async () => {
    if (localStorage.getItem("Token")) {
      try {
        const token = localStorage.getItem("Token");
        console.log("Bearer " + token);
        const res = await axios.get(baseurl + "api/user/verify_token", {
          headers: {
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data.data);
        if (res.data.statusCode === 200) {
          localStorage.setItem("Token", res.data.data.Token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes without header/footer */}
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />

          {/* Routes with header/footer */}
          <Route element={<MainLayout user={user} setUser={setUser} />}>
            <Route path="/" element={<ProblemSection />} />
            <Route path="/problem" element={<ProblemSection />} />
            <Route path="/problem/:id" element={<ProblemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
