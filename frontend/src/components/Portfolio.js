import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import { portfolioAPI, projectsAPI } from "../services/api";

const Portfolio = () => {
  const { isDark } = useTheme();
  const [portfolioData, setPortfolioData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch portfolio data
        const portfolio = await portfolioAPI.getPortfolio();
        setPortfolioData(portfolio);
        
        // Fetch projects data
        const projects = await projectsAPI.getProjects();
        setProjectsData(projects);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Portfolio yuklanmoqda...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="text-red-500 text-xl mb-4">⚠️ Xatolik</div>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="primary-btn"
        >
          Qayta yuklash
        </button>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Portfolio ma'lumotlari topilmadi
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="animated-background"></div>
      <Header />
      <Hero data={portfolioData.personal} />
      <About data={portfolioData.personal} />
      <Skills data={portfolioData.skills} />
      <Projects data={projectsData} />
      <Contact data={portfolioData.personal} />
      <Footer data={portfolioData.personal} />
    </div>
  );
};

export default Portfolio;