import React from "react";
import {useDispatch} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Box, Typography} from "@mui/material";
import FormLayout from "../layout/FormLayout.jsx";

const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;

export default function Signup() {

  const dispatch = useDispatch()
  const history = useHistory();

  const config = {
    title: "Signup",
    titleIcon: <LockOpenIcon/>,
    topRightSection:
      <Box sx={{
        display: 'flex',
        gap: ".5rem",
        alignItems: "center",
      }}>
      <Typography>or</Typography>
      <Typography sx={{userSelect: "none",}}>
        <NavLink to="/login">log in!</NavLink>
      </Typography>
    </Box>,
    formElements: [
      { name: "firstName", label: "First name" , type: "text", required: true },
      { name: "lastName", label: "Last name" , type: "text", required: true },
      { name: "street", label: "Street" , type: "text", required: true },
      { name: "houseNumber", label: "House" , type: "number", required: true },
      { name: "zipCode", label: "Zip code" , type: "text", required: true },
      { name: "city", label: "City" , type: "text", required: true },
      { name: "eMail", label: "E-mail" , type: "email", required: true },
      { name: "password", label: "Password" , type: "password", required: true },
    ],
    submitButtonTitle: "Signup",
    url: APPSERVER_BASEURL + "/users/signupUser",
    onSuccess: (data) => {
      // dispatch({ type: 'auth/set', payload: data });
      console.log(data);
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