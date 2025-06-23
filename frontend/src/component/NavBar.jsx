import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Bell } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">NT</span>
              </div>
              <div className="text-2xl font-bold text-black hover:scale-105 transition-transform duration-300 cursor-pointer">
                Nayak Trader
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Home
              </a>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Categories
                </a>
                <div className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-200">Electronics</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-200">Fashion</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-200">Home & Garden</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-200">Sports</a>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Deals
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Contact
              </a>
            </div>

            {/* Search Bar */}
            <div className={`hidden lg:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-96' : 'w-80'}`}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-300 text-gray-700"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button 
                onClick={toggleSearch}
                className="lg:hidden text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
              >
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <button className="hidden sm:block text-gray-600 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-110 relative">
                <Heart size={22} />
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  2
                </span> */}
              </button>

              {/* Notifications */}
              <button className="hidden sm:block text-gray-600 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 relative">
                <Bell size={22} />
                {/* <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  5
                </span> */}
              </button>

              {/* Cart */}
              <button className="text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <button className="text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110">
                <User size={22} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-in slide-in-from-top-2 duration-300">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col space-y-2">
                <a href="/" className="text-gray-700 hover:text-black font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-black font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  Categories
                </a>
                <a href="#" className="text-gray-700 hover:text-black font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  Deals
                </a>
                <a href="#" className="text-gray-700 hover:text-black font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  About
                </a>
                <a href="#" className="text-gray-700 hover:text-black font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  Contact
                </a>
                
                {/* Mobile Action Items */}
                <div className="flex items-center justify-around pt-4 border-t border-gray-200 mt-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200">
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <Bell size={20} />
                    <span>Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
  
  );
}
