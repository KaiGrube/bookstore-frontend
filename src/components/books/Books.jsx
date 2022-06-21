import BookList from "./BookList.jsx";
import {Box} from "@mui/material";
import Paginator from "./Paginator.jsx";
import React from "react";

export default function Books() {

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <Paginator/>

      <BookList/>

    </Box>
  );
}