import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.type]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func,
};

export default button;
