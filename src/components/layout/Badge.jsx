import {Box, Typography} from "@mui/material";

export default function Badge({ children, badgeContent, onClick }) {

  function handleOnClick() {
    if (onClick) onClick();
  }

  return (
    <Box
      onClick={() => handleOnClick()}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
       }}>

      { children }

      <Box
        sx={{
          position: "relative",
          right: "50%",
          bottom: ".75rem"
      }}>
        <Typography
          sx={{
            display: "flex",
            boxSizing: "content-box",
            justifyContent: "center",
            alignItems: "center",
            width: ".75rem",
            height: ".75rem",
            padding: "0",
            margin: "0",
            // color: 'background.default',
            backgroundColor: 'background.default',
            border: "3px solid",
            borderRadius: ".5rem",
            fontSize: ".5rem",
            fontWeight: "700",
            userSelect: "none"
          }}>
          { badgeContent }
        </Typography>
      </Box>
    </Box>
  )
}