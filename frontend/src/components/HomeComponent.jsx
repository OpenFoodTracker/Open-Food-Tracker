import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box, Button } from '@mui/material';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CookieIcon from '@mui/icons-material/Cookie';
import { useNavigate } from 'react-router-dom';

const HomeComponent = ({ userData, token }) => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const staticMealsData = [
      { name: "Frühstück", calories: 300 },
      { name: "Mittagessen", calories: 500 },
      { name: "Abendessen", calories: 400 },
      { name: "Sonstiges", calories: 200 }
    ];

    const mealIcons = {
      "Frühstück": <BreakfastDiningIcon fontSize="large" />,
      "Mittagessen": <LunchDiningIcon fontSize="large" />,
      "Abendessen": <DinnerDiningIcon fontSize="large" />,
      "Sonstiges": <CookieIcon fontSize="large" />
    };

    const mappedMeals = staticMealsData.map((meal) => ({
      name: meal.name,
      calories: meal.calories,
      icon: mealIcons[meal.name] || <CookieIcon fontSize="large" />
    }));

    setMeals(mappedMeals);
  }, []);

  const handleMealClick = (occasion) => {
    localStorage.setItem('occasion', occasion)
    navigate('/occasionMeals');
  };

  if (!userData || !token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={70} size={140} thickness={4} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="div">
              1254 kcal
            </Typography>
          </Box>
        </Box>
      </Grid>
      {meals.map((meal, index) => (
        <Grid item xs={6} key={index}>
          <Button 
            onClick={() => handleMealClick(meal.name)} 
            variant="contained" 
            sx={{ width: '100%', height: '100%', flexDirection: 'column' }} // Set flexDirection to column
          >
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {meal.name}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1, mr: 1 }}>
                {meal.calories} kcal
              </Typography>
              {meal.icon}
            </div>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeComponent;
