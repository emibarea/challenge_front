import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Divider, Link } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { AssignmentInd, Home } from '@mui/icons-material';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLoguot = () => {
    localStorage.removeItem("token")
    handleClose()
    navigate("/")
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
            Prueba técnica SIW Cargo
          </Typography>
        </Box>
        {true && (
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem sx={{padding: "1rem"}} onClick={() => {navigate("/dashboard"); handleClose()}}><Home /> Home</MenuItem>
              <MenuItem sx={{padding: "1rem"}} onClick={handleProfile}><AssignmentInd /> Perfil</MenuItem>
              <Divider />
              <MenuItem sx={{padding: "1rem"}} onClick={handleLoguot}>
                <LogoutIcon sx={{ mr: 1 }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
