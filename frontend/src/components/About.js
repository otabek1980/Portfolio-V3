import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Calendar, Award, Code, MapPin } from "lucide-react";

const About = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Men Haqimda
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">Tug'ilgan Sana</h3>
              </div>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.birthDate}
              </p>
            </div>

            <div className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold">Tajriba</h3>
              </div>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.experience} Front-End dasturlash sohasida
              </p>
            </div>

            <div className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-yellow-500 mr-3" />
                <h3 className="text-xl font-semibold">Yutuq</h3>
              </div>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.achievement}
              </p>
            </div>

            <div className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg hover:transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold">Joylashuv</h3>
              </div>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.location}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-8 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg`}>
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Mening Hikoyam
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                Men 2007-yilda tug'ilgan va hozirda Front-End dasturlash sohasida 2 yillik tajribaga egaman. 
                Maktab davrida informatika olimpiadasida 3-o'rinni qo'lga kiritganman, bu menga dasturlash 
                sohasidagi ishqimni yanada mustahkamlashga yordam berdi.
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                Zamonaviy web texnologiyalar bilan ishlashga ixtisoslashganman va foydalanuvchi tajribasini 
                yaxshilashga katta e'tibor beraman. Har bir loyihada yangi narsalarni o'rganish va 
                rivojlanishga intilaman.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                O'z bilimlarimni boshqalar bilan bo'lishish uchun Telegram kanalim orqali IT sohasiga 
                oid ma'lumotlar va qodlar bilan o'rtoqlashaman.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border-2 border-dashed ${
              isDark ? "border-purple-500 bg-purple-500/10" : "border-purple-600 bg-purple-50"
            }`}>
              <h4 className="text-lg font-semibold mb-3 gradient-text">
                🎯 Mening Maqsadim
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Dunyodagi eng yaxshi veb-saytlar va ilovalarni yaratish, foydalanuvchilar uchun 
                mukammal tajriba yaratish va IT sohasida o'z hissami qo'shish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;