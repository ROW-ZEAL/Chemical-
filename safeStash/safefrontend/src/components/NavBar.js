import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux'; 
import { unSetUserToken } from '../features/authSlice'; 
import { removeToken } from '../services/LocalStorageService'; 
import { useNavigate } from 'react-router-dom'; 
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { Logout as LogoutIcon, Add as AddIcon } from '@mui/icons-material';

const Navbar = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const { access_token } = getToken();
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate('/login');
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = true; // Assume isActive is based on some state or prop

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" sx={{ backgroundColor: 'grey' }}>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>Aikyam</Typography>

          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

          {access_token && (
            <>
              <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                Financial Data
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={NavLink} to='/amount'>Deposit</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/deposit-history'>Deposit History</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/total-savings'>Total Savings</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/individual-contribution'>Individual Contribution</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/monthly-deposit-summary'>Monthly Deposit Summary</MenuItem>
              </Menu>
            </>
          )}

          {access_token && (
            <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>
          )}

          {access_token && (
            <Button component={NavLink} to='/users' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Users</Button>
          )}

          {access_token && (
            <IconButton component={NavLink} to='/member' className="nav-link" color="inherit">
              <AddIcon />
            </IconButton>
          )}

          {access_token && (
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          )}

          {!access_token && (
            <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
