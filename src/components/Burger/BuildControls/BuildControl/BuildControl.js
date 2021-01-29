import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.name}</div>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        -
      </button>
      <button className={classes.More} onClick={props.added}>
        +
      </button>
    </div>
  );
};

buildControl.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  removed: PropTypes.func,
  added: PropTypes.func,
};

export default buildControl;
