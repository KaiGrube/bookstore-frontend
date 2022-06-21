import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;
const APPSERVER_SIGNUPURL = APPSERVER_BASEURL + '/users/signupUser';
// const APPSERVER_LOGINURL = APPSERVER_BASEURL + '/users/loginUser';

export const initialAuthState = {
  userId: undefined,
  firstName: undefined,
  role: undefined,
  token: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    set: (state, action) => {
      Object.assign(state, action.payload);
    },
    reset: (state, action) => {
      Object.assign(state, initialAuthState);
    },
  },
});

export const {
  set,
  reset,
} = authSlice.actions;

export const signup =  signupData => async (dispatch) => {
  const config = {
    url: APPSERVER_SIGNUPURL,
    method: 'post',
    headers: {"Content-Type": "application/json"},
    data: signupData,
    validateStatus: status => true,
  }
  return axios(config);
}

// export const login = ({eMail, password}) => async (dispatch) => {
//   const config = {
//     url: APPSERVER_LOGINURL,
//     method: 'post',
//     headers: {"Content-Type": "application/json"},
//     data: {eMail, password},
//     validateStatus: status => true,
//   }
//   const response = await axios(config);
//   if (response.status === 200) {
//     dispatch(set({
//       userId: response.data.userId,
//       firstName: response.data.firstName,
//       role: response.data.role,
//       token: response.data.token,
//     }));
//   }
//   return response;
// }

export const logout = () => async (dispatch) => {
  dispatch(reset());
}

export const selectUserId = state => state.auth.userId;
export const selectFirstName = state => state.auth.firstName;
export const selectRole = state => state.auth.role;
export const selectToken = state => state.auth.token;

export default authSlice.reducer;