import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';
import { AiTwotoneAppstore } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="h-full bg-white-800 text-black-100 w-64">
      <div className="flex items-center justify-center p-4">
        <Logo />
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link to="/dashboard" className="flex items-center text-black">
            <AiTwotoneAppstore className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link to="/profile" className="flex items-center text-black">
            <AiTwotoneAppstore className="mr-2" />
            Profile
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link to="/settings" className="flex items-center text-black">
            <AiTwotoneAppstore className="mr-2" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
