import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ user, setUser }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} setUser={setUser} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
