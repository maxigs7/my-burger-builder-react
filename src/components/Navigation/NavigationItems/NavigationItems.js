import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem url="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem url="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
