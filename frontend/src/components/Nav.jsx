import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Binoculars, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

const Nav = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex bg-black justify-between items-center px-6 py-4">
      <div className="font-bold flex gap-3 justify-center items-center text-white text-3xl">
        <Binoculars size="30" />
        GoGuide
      </div>

      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Profile Picture + Username Container */}
        <div 
          onClick={() => navigate('/ProfilePage')} 
          className="flex items-center gap-3 cursor-pointer"
        >
          {user?.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">
              {user?.username || user?.email?.split('@')[0] || 'Guest'}
            </span>
            <span className="text-xs text-gray-500">{user?.email || 'Not logged in'}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <ChevronDown size={20} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 w-48 py-2 bg-white rounded-md shadow-xl z-50">
            <button
              onClick={() => {
                navigate('/ProfilePage');
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={() => {
                navigate('/settings');
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings size={16} />
              Settings
            </button>
            <div className="h-[1px] bg-gray-200 my-2"></div>
            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;