import {configureStore} from '@reduxjs/toolkit';
import bookListSlice from "./slice/bookListSlice.js";
import authSlice from "./slice/authSlice.js";
import settingsSlice from "./slice/settingSlice.js";
import userSlice from "./slice/userSlice.js";
import basketSlice from "./slice/basketSlice.js";
import orderSlice from "./slice/orderSlice.js";
import throttle from "lodash/throttle";
import {loadState, saveState} from "./localStorage.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    settings: settingsSlice,
    user: userSlice,
    bookList: bookListSlice,
    basket: basketSlice,
    order: orderSlice,
  },
  preloadedState: loadState(),
});

store.subscribe(throttle(() => {
  saveState( {
    auth: store.getState().auth,
    basket: store.getState().basket,
  });
},1000))

export default store;