import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;

export const initialUserState = {
  _id: undefined,
  firstName: undefined,
  lastName: undefined,
  street: undefined,
  houseNumber: undefined,
  zipCode: undefined,
  city: undefined,
  eMail: undefined,
  role: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    set: (state, action) => {
      Object.assign(state,  action.payload)
    },
  },
});

export const {
  set,
} = userSlice.actions;


export const fetchUser = (userId) => async dispatch => {
  const config = {
    url: `${APPSERVER_BASEURL}/users/${userId}`,
    method: 'get',
    headers: { "Authorization": sessionStorage.getItem("token") },
    validateStatus: status => true,
  }
  const response = await axios(config);
  if (response.status === 200) {
    dispatch(set(response.data.user));
    return true;
  } else {
    dispatch(set(initialUserState));
    return false;
  }
}

export const selectUser = state => state.user;

export default userSlice.reducer;