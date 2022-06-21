import Header from "./components/Header.jsx";
import {Redirect, Route, Switch} from "react-router-dom";
import Books from "./components/books/Books.jsx";
import Basket from "./components/basket/Basket.jsx";
import Users from "./components/user-management/Users.jsx";
import React from "react";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {selectDarkMode} from "./_store/slice/settingSlice.js";
import Paginator from "./components/books/Paginator.jsx";
import Login from "./components/user-management/Login.jsx";
import Signup from "./components/user-management/Signup.jsx";
import {selectRole} from "./_store/slice/authSlice.js";
import User2 from "./components/user-management/User2.jsx";

export default function App() {

  const darkMode = useSelector(selectDarkMode);
  const role = useSelector(selectRole);

  const themeLight = createTheme({
    palette: {
      mode: "light",
      background: { default: "#f9f9f9" }
    },
  });

  const themeDark = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#303030", }
    },
  });

  return (
      <ThemeProvider theme={darkMode === true ? themeDark : themeLight}>
        <CssBaseline/>
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}>
          <Header/>

          <Box sx={{
            flexGrow: "1",
            // gap: "1rem",
            overflow: "auto"
          }}>
            <Switch>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/books" component={Books}/>
              <Route path="/basket" component={Basket}/>
              {/*<Route path="/order-details/:orderId" component={OrderDetails}/>*/}
              <Route path="/users/:userId" component={User2}/>
              {/*<Route path="/users" component={Users}/>*/}
              <Route path="/users">
                { role !== "admin" ? <Redirect to="/books"/> : <Users/>}
              </Route>
              <Route path="/">
                <Redirect to="/books"/>
              </Route>
              <Route path="*"><h1>404 - Page not found</h1></Route>
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
  )
}