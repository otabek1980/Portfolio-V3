import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import { mockData } from "../data/mockData";

const Portfolio = () => {
  const { isDark } = useTheme();
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="animated-background"></div>
      <Header />
      <Hero data={data.personal} />
      <About data={data.personal} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      <Contact data={data.personal} />
      <Footer data={data.personal} />
    </div>
  );
};

export default Portfolio;