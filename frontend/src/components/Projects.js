import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Github, ExternalLink, Clock, CheckCircle } from "lucide-react";

const Projects = ({ data }) => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState("all");

  const filterProjects = (projects, filter) => {
    if (filter === "all") return projects;
    return projects.filter(project => project.status.toLowerCase() === filter.toLowerCase());
  };

  const filteredProjects = filterProjects(data, filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Mening Loyihalarim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Yaratgan loyihalarim va web dasturlash sohasidagi ishlarim
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : `${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "completed"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : `${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
            }`}
          >
            Tugallangan
          </button>
          <button
            onClick={() => setFilter("in progress")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "in progress"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : `${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
            }`}
          >
            Jarayonda
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-lg`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.6s ease-out forwards"
              }}
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {project.status === "Completed" ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 mr-1" />
                    )}
                    {project.status}
                  </div>
                </div>
                
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDark 
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-16 p-8 rounded-2xl text-center ${
          isDark ? "bg-gray-800/50" : "bg-gray-50"
        } backdrop-blur-lg`}>
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            Yangi Loyihalar Ustida Ishlayapman
          </h3>
          <p className={`text-lg mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Qo'shimcha loyihalar va yangi g'oyalar bilan tez orada qaytaman
          </p>
          <a
            href="#contact"
            className="primary-btn"
          >
            Hamkorlik uchun bog'laning
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;