import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Code, Wrench, BookOpen, TrendingUp } from "lucide-react";

const Skills = ({ data }) => {
  const { isDark } = useTheme();
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const skillLevels = {
    "HTML5": 95,
    "CSS3": 90,
    "JavaScript": 85,
    "React": 80,
    "Tailwind CSS": 88,
    "Bootstrap": 85,
    "Git": 75,
    "GitHub": 80,
    "VS Code": 90,
    "Figma": 70,
    "Photoshop": 65,
    "Node.js": 40,
    "TypeScript": 35,
    "Next.js": 45,
    "Vue.js": 30
  };

  const SkillCard = ({ title, skills, icon: Icon, color }) => (
    <div className={`p-6 rounded-2xl ${
      isDark ? "bg-gray-800/50" : "bg-gray-50"
    } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center mb-6">
        <Icon className={`w-6 h-6 ${color} mr-3`} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {skill}
              </span>
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {skillLevels[skill] || 50}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}>
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                style={{
                  width: animateProgress ? `${skillLevels[skill] || 50}%` : "0%"
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Mening Ko'nikmalarim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Front-End dasturlash sohasidagi ko'nikmalarim va texnologiyalar bilan ishlash darajam
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <SkillCard
            title="Frontend"
            skills={data.frontend}
            icon={Code}
            color="text-blue-500"
          />
          <SkillCard
            title="Vositalar"
            skills={data.tools}
            icon={Wrench}
            color="text-green-500"
          />
          <SkillCard
            title="O'rganayotgan"
            skills={data.learning}
            icon={BookOpen}
            color="text-purple-500"
          />
          <div className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold">Statistika</h3>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">2+</div>
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Yillik Tajriba
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Loyihalar
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">3rd</div>
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Olimpiada O'rni
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Journey */}
        <div className={`mt-16 p-8 rounded-2xl ${
          isDark ? "bg-gray-800/50" : "bg-gray-50"
        } backdrop-blur-lg`}>
          <h3 className="text-2xl font-bold mb-6 gradient-text text-center">
            O'rganish Yo'lim
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Boshlang'ich</h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                HTML va CSS asoslari
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Rivojlanish</h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                JavaScript va React
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Kelajak</h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Full-Stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;