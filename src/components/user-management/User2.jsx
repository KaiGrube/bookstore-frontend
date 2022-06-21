import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormLayout from "../layout/FormLayout.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const APPSERVER_BASEURL = `http://${process.env.REACT_APP_APPSERVER_HOST}:${process.env.REACT_APP_APPSERVER_PORT}`;

export default function User2() {
  const {userId} = useParams();
  const dispatch = useDispatch()
  const history = useHistory();

  const config = {
    title: "User",
    readFirst: true,
    titleIcon: <AccountCircleIcon/>,
    topRightSection: <DeleteForeverIcon color="warning"/>,
    formElements: [
      { name: "firstName", label: "First name" , type: "text", required: true },
      { name: "lastName", label: "Last name" , type: "text", required: true },
      { name: "street", label: "Street" , type: "text", required: true },
      { name: "houseNumber", label: "House" , type: "text", required: true },
      { name: "zipCode", label: "Zip code" , type: "text", required: true },
      { name: "city", label: "City" , type: "text", required: true },
      { name: "eMail", label: "E-mail" , type: "email", required: true },
      { name: "role", label: "Role" , type: "text", required: true },
    ],
    submitButtonTitle: "Update",
    url: APPSERVER_BASEURL + `/users/${userId}`,
    onSuccess: (data) => {
      // dispatch({ type: 'auth/set', payload: data });
      // history.push('/users');
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
