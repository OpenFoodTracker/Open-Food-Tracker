import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpg'; // Stelle sicher, dass dieser Pfad korrekt ist

const Head = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          component={Link}
          to="/"
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
