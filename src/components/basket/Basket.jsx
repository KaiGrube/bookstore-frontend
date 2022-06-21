import {useDispatch, useSelector} from "react-redux";
import {createOrder, selectBasket, selectTotalNumberOfItems,} from "../../_store/slice/basketSlice.js";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ItemList from "./ItemList.jsx";
import {selectUserId} from "../../_store/slice/authSlice.js";
import {Alert, Box, Button, Fade, Paper, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Basket() {
  const history = useHistory();
  const basket = useSelector(selectBasket);
  const totalNumberOfItems = useSelector(selectTotalNumberOfItems);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectUserId) !== null;
  const [message, setMessage] = useState('');

  function setBookQuantity(id, quantity) {
    dispatch({type: 'basket/setItemQuantity', payload: {id, quantity}});
  }

  function deleteRow(id) {
    dispatch({type: 'basket/removeItem', payload: {id}});
  }

  async function createOrderFromBasket() {
    setMessage('');
    if (!isLoggedIn) {
      setMessage('Please log in before you create an order.');
      return;
    }

    const response = await dispatch(createOrder());
    if (response.status === 200) {
      const orderId = response.data._id;
      history.push(`/order-details/${orderId}`);
      return;
    }
  }

  return (
    <Fade in transition={300}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100%",
      }}>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              width: "100%",
            }}
          >

          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            color: "primary.main"
          }}>
            <ShoppingCartIcon sx={{ fontSize: "xxx-large" }}/>
            <Typography variant="h4">
              Basket
            </Typography>
          </Box>

          { totalNumberOfItems > 0 &&
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
              <ItemList items={basket.items}
                        isEditable={true}
                        onChangeItemQuantity={setBookQuantity}
                        onDeleteItem={deleteRow}
              />
              <Button variant="contained"
                      onClick={() => createOrderFromBasket()}>
                Create Order
              </Button>
            </Box>
          }

          { totalNumberOfItems <= 0 &&
            <Typography>
              Your basket is empty.
            </Typography>
          }

          { message !== '' &&
            <Alert severity="info">
              {message}
            </Alert>
          }
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
}