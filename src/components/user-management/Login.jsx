import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import LoginIcon from "@mui/icons-material/Login.js";
import {Box, Typography} from "@mui/material";
import FormLayout from "../layout/FormLayout.jsx";

const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;

export default function Login() {

  const dispatch = useDispatch()
  const history = useHistory();

  const config = {
    title: "Login",
    titleIcon: <LoginIcon/>,
    topRightSection:
      <Box sx={{
        display: 'flex',
        gap: ".5rem",
        alignItems: "center",
      }}>
      <Typography>or</Typography>
      <Typography sx={{userSelect: "none",}}>
       <NavLink to="/signup">sign up!</NavLink>
      </Typography>
     </Box>,
    formElements: [
      { name: "eMail", label: "E-mail" , type: "email", required: true },
      { name: "password", label: "Password" , type: "password", required: true },
    ],
    submitButtonTitle: "Login",
    url: APPSERVER_BASEURL + "/users/loginUser",
    onSuccess: (data) => {
      dispatch({ type: 'auth/set', payload: data });
      history.push('/books');
    },
  }

  return (
   <FormLayout title={config.title}
               titleIcon={config.titleIcon}
               topRightSection={config.topRightSection}
               formElements={config.formElements}
               submitButtonText={config.submitButtonTitle}
               url={config.url}
               onSuccess={config.onSuccess}
   />
  )
}