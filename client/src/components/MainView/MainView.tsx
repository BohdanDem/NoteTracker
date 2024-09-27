import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const MainView = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainView;
