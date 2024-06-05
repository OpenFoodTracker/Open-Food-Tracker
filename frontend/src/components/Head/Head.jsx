import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useHeadConfig } from './HeadService'; // Importiere den Hook von der Service-Datei

const Head = () => {
  const { logo, title, homePath } = useHeadConfig(); // Verwende die Konfigurationsdaten aus dem Hook

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          component={Link}
          to={homePath}
          sx={{ mr: 2 }}
        >
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Head;
