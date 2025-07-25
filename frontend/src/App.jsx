import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import axios from "axios";

import { ThemeProvider } from "./contexts/ThemeContext";

export const baseurl = "http://localhost:3000/";

function App() {
  const verifyUser = async () => {
    if (localStorage.getItem("Token")) {
      console.log(localStorage.getItem("Token"));
      try {
        const res = await axios.get(baseurl+"api/user/verify-token", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        });

        if (res.data.statusCode === 200) {
          console.log("halwa");
          loginCtx.login(res.data.data.user);
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
