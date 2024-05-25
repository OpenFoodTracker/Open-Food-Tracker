import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';

const Navbar = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setValue('/home');
        break;
      case '/statistics':
        setValue('/statistics');
        break;
      case '/profile':
        setValue('/profile');
        break;
      default:
        setValue('/home');
    }
  }, [location.pathname]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/home"
          icon={<HomeIcon />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          label="Statistik"
          value="/statistics"
          icon={<BarChartIcon />}
          component={Link}
          to="/statistics"
        />
        <BottomNavigationAction
          label="Profil"
          value="/profile"
          icon={<AccountCircleIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
