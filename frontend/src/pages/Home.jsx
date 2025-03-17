import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import TabsBar from '../components/TabsBar';

function Home() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(''); // Default tab

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  return (
    <>
      <div className='h-screen'>
        <Nav />
        <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

export default Home;