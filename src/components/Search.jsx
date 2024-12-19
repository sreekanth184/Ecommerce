import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Global_Context from "../Context/global_context";
import logo from "../assets/Images/logo.png";
import { Link as ScrollLink } from "react-scroll";
import { ShoppingBag, UserSearch, Menu, X } from "lucide-react";

function Search({ category = [] }) {
  const { cartcount } = useContext(Global_Context);
  const [searchterm, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onHandle = (e) => setSearch(e.target.value);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img 
                src={logo} 
                alt="logo" 
                className="h-10 w-10 sm:h-12 sm:w-12" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8 text-white text-sm lg:text-base">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              {['products', 'category_list', 'coupon', 'contact'].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="hover:text-orange-400 transition-colors duration-200 cursor-pointer"
                  >
                    {item.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:flex items-center">
              <input
                type="text"
                value={searchterm}
                onChange={onHandle}
                placeholder="Search..."
                className="bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 w-48 lg:w-64 text-sm"
              />
              <Link 
                to={`/search/${searchterm}`}
                className="absolute right-3 text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <UserSearch className="h-5 w-5" />
              </Link>
            </div>

            {/* Cart */}
            <Link to="/carts" className="relative group">
              <ShoppingBag className="text-white h-6 w-6 group-hover:text-orange-400 transition-colors duration-200" />
              {cartcount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartcount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-orange-400 transition-colors duration-200"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen with List Style */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-50 md:hidden" style={{ top: '64px' }}>
          <div className="p-4">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchterm}
                onChange={onHandle}
                placeholder="Search..."
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Link 
                to={`/search/${searchterm}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400"
                onClick={closeMenu}
              >
                <UserSearch className="h-5 w-5" />
              </Link>
            </div>

            {/* Mobile Navigation Links - List Style */}
            <ul className="space-y-0 divide-y divide-gray-700">
              <li className="py-3">
                <Link 
                  to="/" 
                  className="block text-white text-lg hover:text-orange-400 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              {['products', 'category_list', 'coupon', 'contact'].map((item) => (
                <li key={item} className="py-3">
                  <ScrollLink
                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="block text-white text-lg hover:text-orange-400 transition-colors duration-200 cursor-pointer"
                    onClick={closeMenu}
                  >
                    {item.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Search;