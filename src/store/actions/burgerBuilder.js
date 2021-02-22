import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient,
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL,
  };
};

export const fetchIngredients = () => (dispatch) => {
  axios
    .get('/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFail());
    });
};
