import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectFirstName, selectRole} from "../../_store/slice/authSlice.js";
import {FormControlLabel, Switch} from "@mui/material";
import {selectDarkMode, toggleDarkMode} from "../../_store/slice/settingSlice.js";

export default function AccountIndicator() {

  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = useSelector(selectDarkMode);
  const firstName = useSelector(selectFirstName);
  const role = useSelector(selectRole);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleOnClickLogin() {
    history.push("/login")
  }

  function handleOnClickSignup() {
    history.push("/signup")
  }

  function handleOnClickLogout() {
    dispatch(logout())
    history.push("/")
  }

  function handleOnClickAdminOrders() {
    history.push("/orders")
  }

  function handleOnClickUserManagement() {
    history.push("/users")
  }


  return (
    <React.Fragment>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: ".5rem",
        }}>
        <AccountCircleIcon
          sx={{
            fontSize: "xxx-large",
            color: firstName ? "primary.main" : "text.primary"
          }}/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            textAlign: 'center',
            // gap: ".5rem",
          }}>
          <Typography
            noWrap
            sx={{
              display: {xs: "none", md: "block"},
              userSelect: "none",
            }}>
            {firstName ? `Hello ${firstName}!` : "Account"}
          </Typography>

        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />My Profile
        </MenuItem>

        {!firstName &&
        <MenuItem onClick={handleOnClickLogin}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
        }

        {!firstName &&
        <MenuItem onClick={handleOnClickSignup}>
          <ListItemIcon>
            <LockOpenIcon fontSize="small" />
          </ListItemIcon>
          Signup
        </MenuItem>
        }

        {firstName &&
        <MenuItem onClick={handleOnClickLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        }

        <Divider textAlign="left">Settings</Divider>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <FormControlLabel
            value="end"
            control={<Switch/>}
            label="DarkMode"
            labelPlacement="end"
            checked={darkMode}
            onChange={() => dispatch({type: "settings/toggleDarkMode"})}
          />
        </MenuItem>

        {role === "admin" &&
          <Box>
            <Divider textAlign="left">Admin</Divider>
            <MenuItem onClick={handleOnClickUserManagement}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small"/>
              </ListItemIcon>
              Users
            </MenuItem>
            <MenuItem onClick={handleOnClickAdminOrders}>
              <ListItemIcon>
                <LocalShippingIcon fontSize="small"/>
              </ListItemIcon>
              Orders
            </MenuItem>
          </Box>
        }
      </Menu>
    </React.Fragment>
  );
}
