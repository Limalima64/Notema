import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SideDrawer from "./SideDrawer";
import Links from "./Links";
import Backdrop from "./Backdrop";
import MainHeader from "./MainHeader";

import '../Css/MainNavigation.css';

const MainNavigation = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <div id="backdrop-hook">
        {drawerOpen && <Backdrop onClick={closeDrawerHandler} />}
      </div>
      <div id="drawer-hook">
        {drawerOpen && (
          <SideDrawer show={drawerOpen} onClick={closeDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
              <Links />
            </nav>
          </SideDrawer>
        )}
      </div>

      <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to="/">Notema</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <Links />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;