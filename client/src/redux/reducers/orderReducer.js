import { ORDERS_LOADING, ORDERS_LOADED, ORDERS_ERROR } from '../types';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ORDERS_LOADED:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

export default OrderReducer;
