import { ORDERS_LOADING, ORDERS_LOADED, ORDERS_ERROR } from '../types/index';
import axios from 'axios';
import { getToken } from './../../utils/index';

export const getOrders = () => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  try {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = token;
    const orders = await axios.get('/orders');
    if (orders.data) {
      dispatch({ type: ORDERS_LOADED, payload: orders.data });
    } else {
      dispatch({ type: ORDERS_ERROR, payload: 'No Order Found' });
    }
  } catch (e) {
    if (e.message) dispatch({ type: ORDERS_ERROR, payload: e.message });
  }
};
