import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminNav from '../components/AdminNav';
import AdminTabsBar from '../components/AdminTabsBar';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const auth = localStorage.getItem('isAuthenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated ? (
          <>
          <AdminNav setIsAuthenticated={setIsAuthenticated}/>
          <AdminTabsBar />
          </>) : (
          <AdminLogin setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    );
  };
  
  export default Admin;