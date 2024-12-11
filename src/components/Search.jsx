import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Global_Context from "../Context/global_context";
import logo from "../assets/Images/logo.png";
import searchIcon from "../assets/Images/search.png";
import { Link as ScrollLink } from "react-scroll";
import { ShoppingBag, UserSearch, Menu, X } from "lucide-react";

function Search({ category = [] }) {
  const { cartcount } = useContext(Global_Context);
  const [searchterm, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onHandle = (e) => setSearch(e.target.value);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex justify-between items-center m-6 gap-4 relative">
      {/* Logo */}
      <div className="absolute left-4 top-4 sm:static">
        <Link to="/">
          <img src={logo} alt="logo" className="h-12 w-12 sm:h-20 sm:w-20" />
        </Link>
      </div>

      {/* Menu Links - Centered on Desktop */}
      <div className="hidden sm:flex items-center justify-center mx-auto">
        <ul className="text-white flex space-x-4">
        <li className="hover:text-orange-500 hover:cursor-pointer">
           <Link  to={`/`}>Home</Link> 
            </li>
          <li className="hover:text-orange-500 hover:cursor-pointer">
          <ScrollLink to="products" smooth={true} duration={500} offset={-30}>Products</ScrollLink>
          </li>
          <li className="hover:text-orange-500 hover:cursor-pointer">
            <ScrollLink to="category_list" smooth={true} duration={500} offset={-90}>Categories</ScrollLink>
          </li>

          <li className="hover:text-orange-500 hover:cursor-pointer">
           <ScrollLink to="coupon" smooth={true} duration={600} offset={-30} >Features</ScrollLink> 
          </li>
          <li className="hover:text-orange-500 hover:cursor-pointer">
           <ScrollLink to="contact" smooth={true} duration={500} offset={-30} >Contact Us</ScrollLink>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center right-20 border-2 border-orange-400 shadow-sm shadow-orange-400 bg-orange-400 rounded-3xl">
        <input
          type="text"
          name="search"
          value={searchterm}
          onChange={onHandle}
          placeholder="Search..."
          className="bg-transparent text-white placeholder-white placeholder-opacity-80 outline-none p-1.5 w-full pr-8 rounded-3xl text-sm sm:text-base"
        />
        <Link to={`/search/${searchterm}`} className="absolute right-2 bg-white rounded-full p-1 hover:bg-gray-100">
          <UserSearch className="text-orange-400 h-5 w-5" />
        </Link>
      </div>

      <Link
        to="/carts"
        className="absolute top-4 right-20 sm:static flex items-center"
      >
        <ShoppingBag className="text-white h-8 w-8" />
        {cartcount > 0 && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold sm:absolute sm:top-4 sm:-right-1">
            {cartcount}
          </div>
        )}
      </Link>

      <button
        onClick={toggleMenu}
        className="sm:hidden absolute top-4 right-4 focus:outline-none text-white z-50"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex justify-end">
          <div className="w-3/4 sm:w-1/2 bg-gray-800 p-4">
            <ul className="text-white space-y-4 mt-8">
              <li className="hover:text-orange-500">
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li className="hover:text-orange-500">
                <ScrollLink to="products" smooth={true} duration={500} offset={-30} onClick={toggleMenu}>
                  Products
                </ScrollLink>
              </li>
              <li className="hover:text-orange-500">
                <ScrollLink to="category_list" smooth={true} duration={500} offset={-90} onClick={toggleMenu}>
                  Categories
                </ScrollLink>
              </li>
              <li className="hover:text-orange-500">
                <ScrollLink to="coupon" smooth={true} duration={600} offset={-30} onClick={toggleMenu}>
                  Features
                </ScrollLink>
              </li>
              <li className="hover:text-orange-500">
                <ScrollLink to="contact" smooth={true} duration={500} offset={-30} onClick={toggleMenu}>
                  Contact Us
                </ScrollLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
