import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const Contact = ({ data }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Bog'lanish
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Loyihalar, hamkorlik yoki savol-javoblar uchun men bilan bog'laning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg`}>
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Men bilan bog'laning
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-500 mr-4" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href={`mailto:${data.email}`}
                      className={`hover:text-blue-500 transition-colors ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-green-500 mr-4" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefon</h4>
                    <a
                      href={`tel:${data.phone}`}
                      className={`hover:text-green-500 transition-colors ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-purple-500 mr-4" />
                  <div>
                    <h4 className="font-semibold mb-1">Joylashuv</h4>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {data.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            } backdrop-blur-lg`}>
              <h4 className="text-lg font-semibold mb-4 gradient-text">
                Tezkor bog'lanish
              </h4>
              <div className="space-y-3">
                <a
                  href={data.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Telegram orqali yozing</span>
                </a>
                
                <a
                  href={`mailto:${data.email}`}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <Mail className="w-5 h-5 text-green-500 mr-3" />
                  <span>Email yuborish</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          } backdrop-blur-lg`}>
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Xabar yuborish
            </h3>
            
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/20 text-green-500 rounded-lg">
                Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Ismingiz
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Ismingizni kiriting"
                />
              </div>
              
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="emailingizni kiriting"
                />
              </div>
              
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Mavzu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Xabar mavzusini kiriting"
                />
              </div>
              
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Xabar
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Xabaringizni yozing..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full primary-btn ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                    Yuborilmoqda...
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Xabar yuborish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;