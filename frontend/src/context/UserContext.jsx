import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // In UserContext.jsx, update the login function
const login = (userData) => {
  // Log the incoming data for debugging
  console.log('Login data received:', userData);

  // Handle both direct user data and nested user object
  const userInfo = userData.user || userData;

  // Create a properly formatted user object
  const formattedUser = {
    id: userInfo._id || userInfo.id || null,
    email: userInfo.email
  };

  // Validate the formatted user
  if (!formattedUser.email) {
    console.error('No email provided in user data');
    return;
  }

  if (!formattedUser.id) {
    console.warn('No ID provided in user data - attempting to fetch user details');
    // You could make an API call here to fetch user details if needed
    // For now, we'll just store what we have
  }

  console.log('Storing formatted user:', formattedUser);
  setUser(formattedUser);
  localStorage.setItem('user', JSON.stringify(formattedUser));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};