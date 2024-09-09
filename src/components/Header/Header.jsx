import React, { useEffect, useState, useRef } from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import 'tailwindcss/tailwind.css';
import profile from './WhatsApp Image 2024-06-19 at 7.28.55 PM.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchButtonRef = useRef(null); // Ref for search button
  const searchInputRef = useRef(null); // Ref for search input

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        fetchUserData(parsedUser.id);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/find/${id}`);
      
      if (response && response.data) {
        setUser(response.data); 
      } else {
        console.error("No user data found in response.");
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setShowSearch(false); 
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target) &&
          searchButtonRef.current && !searchButtonRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowSearch(false); 
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    setUser(null);

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const getUserProfile = () => {
    if (user) {
      const { name, email, photo } = user;
      return {
        name: name || 'Guest User',
        email: email || 'guest@example.com',
        photo: photo || profile,
      };
    } else {
      return {
        name: 'Guest User',
        email: 'guest@example.com',
        photo: profile,
      };
    }
  };
  
  const currentUser = getUserProfile();

  return (
    <header className="bg-white shadow flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
      <div className="flex items-center w-full sm:w-auto">
        <button 
          className="text-red-600 text-2xl md:hidden"
          onClick={() => setShowSearch(!showSearch)} 
          ref={searchButtonRef} 
        >
          <BiSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          ref={searchInputRef} 
          className={`ml-2 py-2 px-4 border rounded-lg flex-grow md:flex md:w-64 w-24  ${showSearch ? 'block' : 'hidden ' } `}
        />
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <button className="text-red-600 text-2xl">
          <FaEnvelope />
        </button>
        <button className="text-red-600 text-2xl">
          <FaBell />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-red-600 text-2xl focus:outline-none"
          >
            <span className="">
              <img
                className="rounded-full h-22 w-22 sm:h-12 sm:w-12"
                src={currentUser.photo}
                alt="Profile"
              />
            </span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-5 w-64 bg-white shadow-lg rounded-md p-4 z-10">
              <div className="flex items-center">
                <img
                  className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
                  src={currentUser.photo}
                  alt="Profile"
                />
                <div className="ml-4">
                  <h1 className="text-gray-900 font-bold text-lg">
                    {currentUser.name}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <button
                  className="flex items-center text-gray-700 hover:text-red-600 w-full text-left"
                >
                  <i className="bx bx-cog mr-3"></i> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 w-full text-left mt-3"
                >
                  <i className="bx bx-log-out mr-3"></i> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    
      <ToastContainer />
    </header>
  );
};

export default Header;

