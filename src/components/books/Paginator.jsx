import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectNumberOfPages } from "../../_store/slice/bookListSlice.js";
import { Pagination, PaginationItem, Paper, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Paginator() {

  const numberOfPages = useSelector(selectNumberOfPages);
  const dispatch = useDispatch();

  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        bottom: "1rem",
        display: numberOfPages > 0 ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        // marginTop: "6rem",
        zIndex: "1",
      }}>
      <Stack spacing={2}>
        <Pagination
          count={numberOfPages}
          onChange={(e, value) => {
            dispatch({type: "bookList/setPage", payload: value})
            dispatch(fetchBooks());
          }}
          renderItem={(item) => (
            <PaginationItem
              components={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
              {...item}
            />
          )}
        />
      </Stack>
    </Paper>
  );
}
