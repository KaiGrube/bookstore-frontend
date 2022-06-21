import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Box, Typography} from "@mui/material";
import Badge from "../layout/Badge.jsx";

export default function BasketIndicator({totalNumberOfItems, totalPrice, onClick}) {

  function handleOnClick() {
    if (onClick) onClick();
  }

  return (
    <Box
      onClick={() => handleOnClick()}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: {xs: "flex", md: "none"}
        }}>
        <Badge
          badgeContent={totalNumberOfItems}>
          <ShoppingCartIcon
            sx={{
              fontSize: "xxx-large",
            }}
          />
        </Badge>
      </Box>

      <Box
        sx={{
          display: {xs: "none", md: "flex"},
          justifyContent: "center",
          alignItems: "center",
        }}>

        <ShoppingCartIcon
          sx={{
            fontSize: "2.75rem"
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}>

          <Typography
            noWrap
            sx={{fontSize: "small", userSelect: "none"}}>
            {totalNumberOfItems} items
          </Typography>

          <Typography
            noWrap
            sx={{ fontSize: "small", userSelect: "none" }}>
            {totalPrice} €
          </Typography>

        </Box>
      </Box>
    </Box>
  )
}