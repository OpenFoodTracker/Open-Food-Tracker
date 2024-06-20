import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export const useNavbar = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
  };
};
