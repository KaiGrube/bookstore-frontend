import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;

export const initialBasketState = {
  items: [],
  totalNumberOfItems: 0,
  totalPrice: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState: initialBasketState,
  reducers: {
    addItem: (state, action) => {
      const id = action.payload._id;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index].quantity++;
      } else {
        state.items.push({
          id: id,
          title: action.payload.title,
          isbn13: action.payload.isbn13,
          price: action.payload.price,
          quantity: 1,
        });
      }
    state.totalPrice += action.payload.price;
    state.totalNumberOfItems++;
    },

    setItemQuantity: (state, action) => {
      const id = action.payload.id;
      const newQuantity = action.payload.quantity;
      const item = state.items.find(item => item.id === id);
      const oldQuantity = item.quantity;
      item.quantity = newQuantity;
      state.totalNumberOfItems += newQuantity - oldQuantity;
      state.totalPrice += item.price * (newQuantity - oldQuantity);
    },

    removeItem: (state, action) => {
      const id = action.payload.id;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        const item = state.items[index];
        state.totalNumberOfItems -= item.quantity;
        state.totalPrice -= item.quantity * item.price;
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  addItem,
  setItemQuantity,
  removeItem,
} = basketSlice.actions;

export const createOrder = () => async (dispatch, getState) => {
  const userId = sessionStorage.getItem('userId');
  const userToken = sessionStorage.getItem('token');

  const config = {
    url: `${APPSERVER_BASEURL}/users/${userId}/orders`,
    method: 'post',
    headers: { "Authorization": userToken },
    data: {
      basket: selectBasket(getState()),
    },
    validateStatus: () => true,
  }
  return axios(config);
}


export const selectBasket = state => state.basket;
export const selectItems = state => state.basket.items;
export const selectTotalNumberOfItems = state => state.basket.totalNumberOfItems;
export const selectTotalPrice = state => state.basket.totalPrice;

export default basketSlice.reducer;