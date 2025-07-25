import Header from "../components/Header";
import ProblemSection from "../components/ProblemSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header/>
      <ProblemSection />
      <Footer />
    </div>
  );
};

export default HomePage;
