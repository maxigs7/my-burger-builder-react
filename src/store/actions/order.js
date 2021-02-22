import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const createOrderSuccess = (orderData, id) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    id: id,
    order: orderData,
    error: null,
  };
};

export const createOrderFail = (error) => {
  return {
    type: actionTypes.CREATE_ORDER_FAIL,
    error: error,
  };
};

export const createOrderStart = () => {
  return {
    type: actionTypes.CREATE_ORDER_START,
  };
};

export const createOrderInit = () => {
  return {
    type: actionTypes.CREATE_ORDER_INIT,
  };
};

export const createOrder = (orderData) => (dispatch) => {
  dispatch(createOrderStart());
  axios
    .post('/orders.json', orderData)
    .then((response) => {
      dispatch(createOrderSuccess(orderData, response.data.name));
    })
    .catch((error) => {
      dispatch(createOrderFail(error));
    });
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
    error: null,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json')
      .then((response) => {
        const fetchedOrders = [];
        for (const key in response.data) {
          if (Object.hasOwnProperty.call(response.data, key)) {
            fetchedOrders.push({ ...response.data[key], id: key });
          }
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
