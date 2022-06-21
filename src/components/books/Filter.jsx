import {useDispatch, useSelector} from "react-redux";
import {
  fetchBooks,
  selectFilter, selectLimit, selectSort,
  selectTotalNumberOfResults, setLimit, setPage, setSort,
  updateFilter
} from "../../_store/slice/bookListSlice.js";
import {Box, FormControl, InputLabel, Select, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useHistory} from "react-router-dom";
import Paginator from "./Paginator.jsx";
import React from "react";

export default function Filter() {

  const dispatch = useDispatch();
  const history = useHistory();
  const filter = useSelector(selectFilter);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const limit = useSelector(selectLimit);
  const sort = useSelector(selectSort);


  function handleOnTitleChange(e) {
    dispatch(updateFilter(e.target.value));
    if (history.location.pathname !== "/books") {
      history.push("/books")
    }
  }

  function handleOnLimitChange(e) {
    dispatch(setLimit(e.target.value));
    dispatch(setPage(1));
    dispatch(fetchBooks())
    if (history.location.pathname !== "/books") {
      history.push("/books")
    }
  }

  function handleOnSortChange(e) {
    dispatch(setSort(e.target.value));
    dispatch(setPage(1));
    dispatch(fetchBooks())
    if (history.location.pathname !== "/books") {
      history.push("/books")
    }
  }

  return (
    <Box component="div"
         display="flex"
    >

      <FormControl sx={{ m: 1, minWidth: "4rem" }}>
        <TextField type="text"
                   label="Title"
                   size="small"
                   value={filter}
                   onChange={handleOnTitleChange}
        />
      </FormControl>

      <FormControl
        size="small"
        sx={{ m: 1, minWidth: "4rem"}}
      >
        <InputLabel id="limitLabelId">Limit</InputLabel>
        <Select
          labelId="limitLabelId"
          label="Limit"
          value={limit}
          onChange={handleOnLimitChange}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="200">200</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small"
                   sx={{ m: 1, minWidth: "8rem" }}>
        <InputLabel id="sortLabelId">Sort</InputLabel>
        <Select labelId="sortLabelId"
                label="sort"
                value={sort}
                onChange={handleOnSortChange}>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="subtitle">Subtitle</MenuItem>
          <MenuItem value="isbn13">ISBN13</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{
        display: "flex",
        alignItems: "center",
        color: "primary.main"
      }}>
        {/*<Typography>*/}
        {/*  {totalNumberOfResults} results*/}
        {/*</Typography>*/}
      </Box>
    </Box>
  );
}
