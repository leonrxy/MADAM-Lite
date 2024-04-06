import React from 'react';
import { FaBolt } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="p-4 font-bold" style={{ fontSize: '25px' }}>
      <span className="text-red-500" style={{ color: '#DC362E' }}>
        MADAM
      </span>
      <span className="text-black">Lite</span>
      <FaBolt className="inline-block text-sm align-top -ml-1" />
    </div>
  );
};

export default Logo;
