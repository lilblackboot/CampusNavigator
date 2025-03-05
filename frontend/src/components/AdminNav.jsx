import React from 'react';
import { Binoculars, LogOut, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNav = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const handleChangeCredentials = () => {
    navigate('/change-credentials');
  };

  return (
    <nav className="flex bg-black justify-between items-center px-6 py-4">
      {/* Logo */}
      <div className="font-bold flex gap-3 justify-center items-center text-white text-3xl">
        <Binoculars size="30" />
        GoGuide Admin
      </div>

      {/*Logout Button */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleChangeCredentials}
          className="flex items-center gap-2 bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <KeyRound size={18}/>
          Change Credentials
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
