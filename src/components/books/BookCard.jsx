import {Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function BookCard({ book, onAddToBasket }) {

  // const classes = useStyles();

  return (

    <Card sx={{ display: "flex", alignItems: "center" }}
          onClick={() => onAddToBasket(book)}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={ book.image }
        alt={ book.title }>
      </CardMedia>
      <CardContent>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25rem",
        }}>
          <Typography sx={{ fontSize: "large", fontWeight: "700" }}>
            {book.title !== "" ? book.title : "n.a."}
          </Typography>
          <Divider/>

          <Typography>
            "{book.subtitle !== "" ? book.subtitle : "-"}"
          </Typography>
          <Divider/>
          <Typography>
            ISBN-13: {book.isbn13}
          </Typography>
          <Divider/>
          <Typography sx={{ fontWeight: "700"}}>
            Price: {book.price !== 0 ? book.price + "$" : "free"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
