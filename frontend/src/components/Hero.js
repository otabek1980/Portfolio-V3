import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Github, Instagram, MessageCircle, ExternalLink } from "lucide-react";

const Hero = ({ data }) => {
  const { isDark } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    "Front-End Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Creative Coder"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTitle = titles[currentIndex];
      
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">Salom!</span>
                <br />
                <span className={`${isDark ? "text-white" : "text-gray-900"}`}>
                  Men {data.name}
                </span>
              </h1>
              
              <div className="text-2xl lg:text-3xl mb-6 h-12">
                <span className="gradient-text font-semibold">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              
              <p className={`text-xl mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </a>
                <a
                  href={data.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Telegram
                </a>
              </div>

              {/* Telegram Channel Promotion */}
              <div className={`p-6 rounded-2xl border-2 border-dashed ${
                isDark ? "border-blue-500 bg-blue-500/10" : "border-blue-600 bg-blue-50"
              } animate-pulse-slow`}>
                <h3 className="text-xl font-semibold mb-3 gradient-text">
                  🚀 IT Kanalimga A'zo Bo'ling!
                </h3>
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  IT sohasiga oid ma'lumotlar, qodlar va yangiliklar uchun Telegram kanalimni kuzatib boring
                </p>
                <a
                  href={data.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn inline-flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  @Webbuild kanalga qo'shilish
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-spin-slow">
                <div className={`w-full h-full rounded-full ${
                  isDark ? "bg-gray-900" : "bg-white"
                } flex items-center justify-center`}>
                  <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
                    O
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-pink-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;