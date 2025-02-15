import React from 'react';
import {ChevronDown , Binoculars } from 'lucide-react';


const Nav = () => {
  return (
    <nav className="flex bg-black justify-between items-center px-6 py-4 ">
      {/* Logo */}
      <div className="font-bold flex gap-3 justify-center items-center text-white text-3xl">
        <Binoculars size="30" />
        GoGuide
      </div>
     

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">Ellington Thom</span>
          <span className="text-xs text-gray-500">username@gmail.com</span>
        </div>
        <ChevronDown />
      </div>
    </nav>
  );
};


export default Nav;