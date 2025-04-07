// Layout.jsx mis à jour
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AudioControls from './AudioControls';

const Layout = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(isLightMode ? 'light-mode' : 'dark-mode');
  }, [isLightMode]);

  return (
    <>
      <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      <main style={{ minHeight: '100vh', backgroundColor: isLightMode ? '#ebebed' : '#000' }}>
        <Outlet context={{ isLightMode }} />
      </main>
      <AudioControls />
    </>
  );
};

export default Layout;