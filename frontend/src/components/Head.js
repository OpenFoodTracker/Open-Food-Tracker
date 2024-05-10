import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.jpg'; // Stelle sicher, dass dieser Pfad korrekt ist

const Head = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OPEN FOOD TRACKER
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Head;