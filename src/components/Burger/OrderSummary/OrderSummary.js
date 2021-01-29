import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .filter((key) => props.ingredients[key])
    .map((key) => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:
        {props.ingredients[key]}
      </li>
    ));
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price:</strong> {props.price.toFixed(2)}
      </p>
      <p>Continue to checkout?</p>
      <Button type="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.purchaseConfirmed}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  purchaseCanceled: PropTypes.func,
  purchaseConfirmed: PropTypes.func,
};

export default orderSummary;
