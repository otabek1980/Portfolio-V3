import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Github, Instagram, MessageCircle, ExternalLink, Heart } from "lucide-react";

const Footer = ({ data }) => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-16 ${
      isDark ? "bg-gray-800/50" : "bg-gray-50"
    } backdrop-blur-lg`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold gradient-text mb-4">
              Otabek
            </div>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Front-End Developer va IT sohasida faol ishtirok etuvchi
            </p>
            <div className="flex space-x-4">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600" 
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600" 
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={data.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600" 
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              Tezkor Havolalar
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Men haqimda
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Ko'nikmalar
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Loyihalar
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Bog'lanish
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              Bog'lanish
            </h4>
            <div className="space-y-3">
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Email
                </p>
                <a
                  href={`mailto:${data.email}`}
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {data.email}
                </a>
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Telefon
                </p>
                <a
                  href={`tel:${data.phone}`}
                  className={`hover:text-blue-500 transition-colors ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {data.phone}
                </a>
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Joylashuv
                </p>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {data.location}
                </p>
              </div>
            </div>
          </div>

          {/* Telegram Channel Promotion */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              IT Kanali
            </h4>
            <div className={`p-4 rounded-xl ${
              isDark ? "bg-gray-700/50" : "bg-white"
            } border border-blue-500/20`}>
              <div className="flex items-center mb-3">
                <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium">@Webbuild</span>
              </div>
              <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                IT sohasiga oid ma'lumotlar va qodlar
              </p>
              <a
                href={data.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Kanalga kirish
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-center md:text-left ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              © {currentYear} Xodjayev Otabek. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Muhabbat bilan yaratilgan
              </span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Uzbekiston'da
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;