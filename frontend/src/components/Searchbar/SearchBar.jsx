import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      localStorage.setItem('currentIngredientId', searchTerm);
      navigate('/addMeal');
    }
  };

  return (
    <TextField className="searchbar"
      label="Suche"
      variant="standard"
      size="small"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBar;
