import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full mb-4 sm:mb-6">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-thin tracking-wider mb-3 sm:mb-4">STAY IN STYLE</h3>
            <p className="text-gray-600 font-light text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-2">
              Subscribe to our newsletter for exclusive collections, style tips, and early access to sales
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-gray-400 text-black placeholder-gray-500 focus:border-black focus:outline-none font-light tracking-wide text-sm sm:text-base"
              />
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-light tracking-wider hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4 sm:mb-6">
            </div>
            <p className="text-gray-600 font-light leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
              Premium fashion brand dedicated to elevating your style with contemporary clothing, timeless elegance, and uncompromising quality.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-400 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-400 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-400 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-400 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left lg:col-span-1">
            <h4 className="text-base sm:text-lg font-light tracking-wider mb-4  sm:mb-6 text-black">CONTACT</h4>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start justify-center sm:justify-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                  <span className="block">Khalarda</span>
                  <span className="block">Style District</span>
                  <span className="block">Cuttack, Odisha, PIN 753011</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
              <a href="tel:+917788899500" className="text-gray-600 font-light hover:text-black transition-colors text-sm sm:text-base">
                +91 7788899500
              </a>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
              <a href="mailto:subhamnayak@gmail.com" className="text-gray-600 font-light hover:text-black transition-colors text-sm sm:text-base break-all">
                subhamnayak@gmail.com
              </a>
            </div>
          </div>



        </div>
      </div>



      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 tracking-wider text-center md:text-left">
              &copy; 2024 NAYAK TRADER. ALL RIGHTS RESERVED.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item, index) => (
                <a key={index} href="#" className="text-gray-500 hover:text-black transition-colors tracking-wide font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;