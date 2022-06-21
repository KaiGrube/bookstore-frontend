import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
// const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;
// const APPSERVER_CREATE_ORDER_URL = APPSERVER_BASEURL + '/orders/create';

export const initialOrderState = {
  userId: undefined,
  basket: undefined,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    addBasketToOrder: (state, action) => {
      state.basket = action.payload;
    }
  },
});

export const {
  addBasketToOrder,

} = orderSlice.actions;

export const readOrder = orderId => async (getState, dispatch) => {
  const userId = sessionStorage.getItem('userId');
  const config = {
    url: `http://localhost:3001/users/${userId}/orders/${orderId}`,
    method: 'get',
    headers: {"Authorization": sessionStorage.getItem("token")},
    validateStatus: () => true,
  }
  return axios(config);
}

export default orderSlice.reducer;