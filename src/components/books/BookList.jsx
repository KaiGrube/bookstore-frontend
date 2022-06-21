import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBooks, selectBookList} from "../../_store/slice/bookListSlice.js";
import {Container, Fade, Grid, Paper} from "@mui/material";
import BookCard from "./BookCard.jsx";

export default function BookList() {

  const books = useSelector(selectBookList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch])

  function addItemToBasket(book) {
    dispatch({type: 'basket/addItem', payload: book});
  }

  return (
    <Fade in timeout={300}>
      <Container>
        <Grid container spacing={2} padding="1rem">
          {books.length > 0 && books.map(book =>
            <Grid item key={book._id} xs={12} md={4}>
              <BookCard book={book} onAddToBasket={addItemToBasket}/>
            </Grid>
          )}

          {books.length <= 0 &&
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "1rem",
            }}>
            There are no results for your query.
          </Paper>
          }
        </Grid>
      </Container>
    </Fade>
  );
}