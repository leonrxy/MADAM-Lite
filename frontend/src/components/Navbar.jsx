import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ onLogout, paths }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center text-gray-800">
      <div className="flex items-center">
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {collapsed ? (
            <FaBars className="text-xl text-gray-800 hover:text-black" />
          ) : (
            <FaTimes className="text-xl text-gray-800 hover:text-black" />
          )}
        </button>
        <Link to="/" className="text-xl font-bold ml-4">
          My App
        </Link>
      </div>
      <div className="flex items-center">
        <FaUserCircle className="text-2xl ml-4" />
        <button className="ml-2 focus:outline-none" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
