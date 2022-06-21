import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {logout, selectFirstName, selectRole, selectUserId} from "../_store/slice/authSlice.js";
import {selectTotalNumberOfItems, selectTotalPrice} from "../_store/slice/basketSlice.js";
import {Box, FormControlLabel, Paper, Switch, Typography} from "@mui/material";
import AccountIndicator from "./navigation/AccountIndicator.jsx";
import BasketIndicator from "./navigation/BasketIndicator.jsx";
import Filter from "./books/Filter.jsx";
import {toggleMode} from "../_store/slice/settingSlice.js";


export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = {
    userId: useSelector(selectUserId),
    firstName: useSelector(selectFirstName),
    role: useSelector(selectRole),
  }

  const isLoggedIn = user.userId !== undefined;
  const totalNumberOfItems = useSelector(selectTotalNumberOfItems);
  const totalPrice = useSelector(selectTotalPrice);

  function onClickLoginHandler() {
    history.push('/login');
  }

  function onClickLogoutHandler() {
    dispatch(logout());
    history.push('/')
  }

  function onClickSignupHandler() {
    history.push('/signup')
  }

  function onClickBasketHandler() {
    history.push('/basket')
  }


  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        padding: ".5rem",
        zIndex: "10",
  }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography
          align="center"
          noWrap
          onClick={() => history.push('/')}
          sx={{
            display: {xs: "none", md: "block"},
            width: '14rem',
            borderRadius: '2rem',
            border: '2px solid',
            fontSize: 'x-large',
            fontWeight: '300',
          }}
        >
          IT Book Store
        </Typography>
      </Box>

      <AccountIndicator/>

      <Filter/>

      <BasketIndicator totalNumberOfItems={totalNumberOfItems}
                       totalPrice={totalPrice.toFixed(2)}
                       onClick={() => history.push('/basket')}/>

    </Paper>
  );
}
