import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.sideDrawerToggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;
