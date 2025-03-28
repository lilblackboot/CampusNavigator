import React, { useState, useRef } from 'react';
import { Camera, User as UserIcon } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

// Inline Button component
const Button = ({ children, onClick, className, ...props }) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`} 
    {...props}
  >
    {children}
  </button>
);

// Inline Input component
const Input = ({ type, value, onChange, placeholder, className, ...props }) => (
  <input 
    type={type} 
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border rounded ${className}`}
    {...props}
  />
);

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);
  const fileInputRef = useRef(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        updateUser({ profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Update user with new username and profile picture
    updateUser({ username, profilePicture });
    
    // Navigate back to home page
    navigate('/home');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            className="hidden" 
            onChange={handleProfilePictureChange}
          />
          <div 
            className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative group"
            onClick={() => fileInputRef.current.click()}
          >
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon size={64} className="text-gray-500" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={32} className="text-white" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <Input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mb-4"
          />

          <Button 
            onClick={handleSaveProfile} 
            className="w-full"
          >
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;