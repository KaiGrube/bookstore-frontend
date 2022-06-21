import {Card, CardHeader, CardMedia} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function BookListCard({ book, onAddToBasket }) {

  const classes = useStyles();

  return (
      <Card className={classes.root}
            onClick={() => onAddToBasket(book)}>

        <CardHeader title={book.title}
                    subheader={book.subtitle}
        />

        <CardMedia className={classes.media}
                   image={book.image}
        />

        {/*<div className="image">*/}
        {/*  <img src={book.image} alt={book.title}/>*/}
        {/*</div>*/}

        {/*<div className="subtitle">*/}
        {/*  Subtitle: {book.subtitle !== "" ? book.subtitle : "n.a."}*/}
        {/*</div>*/}
        {/*<div className="isbn13">*/}
        {/*  ISBN-13: {book.isbn13}*/}
        {/*</div>*/}
        {/*<div className="price">*/}
        {/*  Price: {book.price !== 0 ? book.price + "$" : "free"}*/}
        {/*</div>*/}

      </Card>
  );
}
