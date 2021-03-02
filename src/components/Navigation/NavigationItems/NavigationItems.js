import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem url="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem url="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem url="/sign-in">Sign In</NavigationItem>
    ) : (
      <NavigationItem url="/sign-out">Sign Out</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
