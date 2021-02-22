import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
};

const initialState = {
  ingredients: null,
  price: 4,
  error: false,
  loading: false,
};

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: updateObject(state.ingredients, {
      [action.ingredient]: state.ingredients[action.ingredient] + 1,
    }),
    price: state.price + INGREDIENT_PRICES[action.ingredient],
  });
};

const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: updateObject(state.ingredients, {
      [action.ingredient]: state.ingredients[action.ingredient] - 1,
    }),
    price: state.price - INGREDIENT_PRICES[action.ingredient],
  });
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: updateObject(state.ingredients, {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    }),
    error: false,
    price: 4,
  });
};

const fetchIngredientsFail = (state, action) => {
  return updateObject(state, {
    ingredients: null,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
