import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
  { name: 'Salad', type: 'salad' },
  { name: 'Meat', type: 'meat' },
  { name: 'Bacon', type: 'bacon' },
  { name: 'Cheese', type: 'cheese' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {CONTROLS.map((ctrl) => (
        <BuildControl
          key={ctrl.type}
          name={ctrl.name}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.canOrder}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

buildControls.propTypes = {
  canOrder: PropTypes.bool,
  ordered: PropTypes.func,
  price: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
};

export default buildControls;
