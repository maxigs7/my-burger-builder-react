import React from 'react';
import PropTypes from 'prop-types';

import Bacon from './Bacon/Bacon';
import BreadBottom from './BreadBottom/BreadBottom';
import BreadTop from './BreadTop/BreadTop';
import Cheese from './Cheese/Cheese';
import Meat from './Meat/Meat';
import Salad from './Salad/Salad';

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <BreadBottom />;
      break;
    case 'bread-top':
      ingredient = <BreadTop />;
      break;
    case 'meat':
      ingredient = <Meat />;
      break;
    case 'cheese':
      ingredient = <Cheese />;
      break;
    case 'salad':
      ingredient = <Salad />;
      break;
    case 'bacon':
      ingredient = <Bacon />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
