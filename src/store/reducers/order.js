import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

const createOrderInit = (state, action) => {
  return updateObject(state, {
    purchased: false,
    error: null,
  });
};

const createOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const createOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: [updateObject(action.order, { id: action.id })],
    loading: false,
    error: null,
    purchased: true,
  });
};
const createOrderFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {
    orders: [],
    loading: true,
    error: null,
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
    error: null,
  });
};
const fetchOrdersFail = (state, action) => {
  return updateObject(state, {
    orders: [],
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_INIT:
      return createOrderInit(state, action);
    case actionTypes.CREATE_ORDER_START:
      return createOrderStart(state, action);
    case actionTypes.CREATE_ORDER_SUCCESS:
      return createOrderSuccess(state, action);
    case actionTypes.CREATE_ORDER_FAIL:
      return createOrderFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
