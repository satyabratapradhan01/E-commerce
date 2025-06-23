import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToCenter = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      

      {/* Hero Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Brand Section */}
          <div className={`transform transition-all duration-1000`}>
            
           
            
            {/* Large Brand Name */}
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-thin tracking-widest mb-6 leading-none">
              NAYAK
              <span className="block text-5xl md:text-7xl lg:text-8xl font-light mt-4 tracking-wider">
                TRADER
              </span>
            </h1>
            
            {/* Tagline */}
            <div className="mb-12">
              <div className="w-32 h-px bg-black mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl font-light tracking-wide text-gray-800 max-w-3xl mx-auto leading-relaxed">
                Elevate Your Style with Premium Fashion
              </p>
              <p className="text-lg md:text-xl font-light tracking-wide text-gray-600 max-w-2xl mx-auto mt-4">
                Contemporary Clothing • Timeless Elegance • Uncompromising Quality
              </p>
              <div className="w-32 h-px bg-black mx-auto mt-8"></div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-16 py-5 bg-black text-white font-light tracking-wider hover:bg-gray-800 transition-all duration-300 text-lg">
                <span className="relative z-10">SHOP COLLECTION</span>
              </button>
              <button className="group relative px-16 py-5 bg-transparent border-2 border-black text-black font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300 text-lg overflow-hidden">
                <span className="relative z-10">VIEW LOOKBOOK</span>
                <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>

            {/* Fashion Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-thin mb-3">500+</div>
                <div className="text-sm text-gray-600 tracking-wider uppercase">Designs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-thin mb-3">15+</div>
                <div className="text-sm text-gray-600 tracking-wider uppercase">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-thin mb-3">10K+</div>
                <div className="text-sm text-gray-600 tracking-wider uppercase">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-thin mb-3">99%</div>
                <div className="text-sm text-gray-600 tracking-wider uppercase">Satisfaction</div>
              </div>
            </div>

            {/* Fashion Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
              {['CASUAL WEAR', 'FORMAL ATTIRE', 'ACCESSORIES', 'FOOTWEAR'].map((category, index) => (
                <div key={index} className="text-center py-6 border border-gray-200 hover:border-black transition-all duration-300 cursor-pointer group">
                  <span className="text-sm tracking-wider font-light group-hover:text-gray-700">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Side Fashion Elements */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-px h-24 bg-black opacity-20"></div>
          <div className="text-xs tracking-widest transform -rotate-90 origin-center text-gray-500 whitespace-nowrap">
            PREMIUM FASHION
          </div>
          <div className="w-px h-24 bg-black opacity-20"></div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-px h-24 bg-black opacity-20"></div>
          <div className="text-xs tracking-widest transform rotate-90 origin-center text-gray-500 whitespace-nowrap">
            STYLE REDEFINED
          </div>
          <div className="w-px h-24 bg-black opacity-20"></div>
        </div>
      </div>
    
    </div>
  );
};

export default Hero;