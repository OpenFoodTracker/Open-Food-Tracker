import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, LinearProgress, Box, IconButton, Card, CardContent } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, addDays, subDays } from 'date-fns'; // Library for date manipulation
// import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import breakfastIcon from './images/breakfast.png';
import lunchIcon from './images/lunch.png';
import dinnerIcon from './images/dinner.png';
import snackIcon from './images/snack.png';
import MultiCycleCircularProgress from './MultiCycleCircularProgress';

const calculateDailyCalorieGoal = (currentWeight, goalWeight) => {
  const weightDifference = currentWeight - goalWeight;
  const baseCalories = currentWeight * 24; // Grobe Schätzung: 24 Kalorien pro Kilogramm Körpergewicht pro Tag

  // Wenn das Zielgewicht kleiner ist als das aktuelle Gewicht, reduzieren wir die Kalorienzufuhr
  // Wenn das Zielgewicht größer ist als das aktuelle Gewicht, erhöhen wir die Kalorienzufuhr
  const calorieAdjustment = weightDifference * 10; // Beispielsweise 10 Kalorien pro kg Unterschied
  return baseCalories - calorieAdjustment;
};

const HomeComponent = ({ userData, token }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Use Date for date manipulation
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User data in useEffect:', userData);
    if (userData && userData.weight && userData.goal) {
      fetchMeals(selectedDate);
    } else {
      console.error('User data or userId is missing');
      setLoading(false);
    }
  }, [selectedDate, userData, token]);

  // Berechnung des Tagesziels basierend auf Benutzergewicht und Zielgewicht
  const dailyCalorieGoal = userData && userData.weight && userData.goal
    ? calculateDailyCalorieGoal(userData.weight, userData.goal)
    : 2000; // Defaultwert, falls userData fehlt
    const dailyProteinGoal = 50;  //complete default values
    const dailyFatGoal = 70;
    const dailyCarbsGoal = 300;

  const fetchMeals = async (date) => {
    setLoading(true);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const userId = userData ? userData._id : '';

    console.log('Fetching meals for user:', userId, 'on date:', formattedDate);

    try {
      const response = await axios.get(`/api/meal/user/day/${userId}/${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const mealsData = response.data;
      console.log('Fetched meals:', mealsData);
    
      const mappedMeals = ['breakfast', 'lunch', 'dinner', 'snack'].map(occasion => {
        const items = mealsData[occasion] || [];
        const totalNutrients = items.reduce((totals, item) => {
          totals.calories += item.kcal;
          totals.protein += item.protein;
          totals.fat += item.fat;
          totals.carbs += item.carbs;
          return totals;
        }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

        return {
          name: occasion,
          items,
          totalNutrients: {
            calories: Math.round(totalNutrients.calories),
            protein: Math.round(totalNutrients.protein),
            fat: Math.round(totalNutrients.fat),
            carbs: Math.round(totalNutrients.carbs)
          }
        };
      });

      setMeals(mappedMeals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
     
      const defaultMeals = ['breakfast', 'lunch', 'dinner', 'snack'].map(occasion => ({
        name: occasion,
        items: [],
        // icon: mealIcons[occasion],
        totalNutrients: { calories: 0, protein: 0, fat: 0, carbs: 0 }
      }));
      setMeals(defaultMeals);
      setLoading(false);
    }
  };

  const getMealIcon = (mealName) => {
  switch (mealName) {
    case 'breakfast':
      return breakfastIcon;
    case 'lunch':
      return lunchIcon;
    case 'dinner':
      return dinnerIcon;
    case 'snack':
      return snackIcon;
    default:
      return null;
  }
};

const mealTranslations = {
  breakfast: 'Frühstück',
  lunch: 'Mittagessen',
  dinner: 'Abendessen',
  snack: 'Snack',
};

  const handleCardClick = (occasion) => {
    let mealOccasion = "snack";                                                 //gets the correct occasion string for the api
    if(occasion === "breakfast"){
        mealOccasion = "Frühstück";
    } else if(occasion === "lunch"){
        mealOccasion = "Mittagessen";
    } else if(occasion === "dinner"){
        mealOccasion = "Abendessen";
    } else if(occasion === "snack"){
        mealOccasion = "Sonstiges";
    }
    localStorage.setItem('occasion', mealOccasion);
    localStorage.setItem('inputDate', selectedDate);
    navigate('/occasionMeals');
  };

  const handlePrevDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  const calculateTotalNutrients = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    meals.forEach(meal => {
      totalCalories += meal.totalNutrients.calories;
      totalProtein += meal.totalNutrients.protein;
      totalFat += meal.totalNutrients.fat;
      totalCarbs += meal.totalNutrients.carbs;
    });

    return { totalCalories, totalProtein, totalFat, totalCarbs };
  };

  const totalNutrients = calculateTotalNutrients();

  const progressValue = Math.min(totalNutrients.totalCalories / dailyCalorieGoal * 100, 100);
  const overProgressValue = totalNutrients.totalCalories > dailyCalorieGoal
    ? (totalNutrients.totalCalories - dailyCalorieGoal) / dailyCalorieGoal * 100
    : 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    // <Box sx={{ height: '100vh', overflowY: 'auto'}}>
    <Box>
      <div className="addMealHead">
        <Grid item xs={8} sx={{ textAlign: 'center', padding: 1 }}>
          <Typography variant="h6">{format(selectedDate, 'dd.MM.yyyy')}</Typography>
        </Grid>
      
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

          {/* arrow last Day */}
          <Grid item xs={2} container alignItems="center" className="multiProgressArrowLeft">
            <IconButton onClick={handlePrevDay}>
              <ArrowBack />
            </IconButton>  
          </Grid>

          {/*ProgressCircle */}
          <Box className="multiProgressProgress" sx={{ position: 'relative', display: 'inline-flex'  }}>
            <MultiCycleCircularProgress value={totalNutrients.totalCalories} dailyGoal={dailyCalorieGoal} /> 
            
          </Box>

          {/* arrow Next Day */}
          <Grid item xs={2} container justifyContent="flex-end" className="multiProgressArrowRight">
            <IconButton onClick={handleNextDay}>
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>        
      
        {/* Linear Progress */}
        <Box sx={{ padding: '2vh 3vh', display: 'flex', justifyContent: 'center', gap: '2vh' }}>
        <Box sx={{ textAlign: 'left', width: '100px' }}>
          <Typography variant="body2">Proteine</Typography>
          <LinearProgress 
            variant="determinate" 
            value={totalNutrients.totalProtein <= dailyProteinGoal 
              ? (totalNutrients.totalProtein / dailyProteinGoal) * 100 
              : 100} 
            sx={{
              height: '10px',
              borderRadius: '5px',
              '& .MuiLinearProgress-bar': {
                borderRadius: '5px',
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          />
          <Typography variant="body2" sx={{color: 'grey'}}>{totalNutrients.totalProtein}g / {dailyProteinGoal}g</Typography>
        </Box>

        <Box sx={{ textAlign: 'left', width: '100px' }}>
          <Typography variant="body2">Fett</Typography>
          <LinearProgress 
            variant="determinate" 
            value={totalNutrients.totalFat <= dailyFatGoal 
              ? (totalNutrients.totalFat / dailyFatGoal) * 100 
              : 100} 
            sx={{
              height: '10px',
              borderRadius: '5px',
              '& .MuiLinearProgress-bar': {
                borderRadius: '5px',
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          />
          <Typography variant="body2"  sx={{color: 'grey'}}>{totalNutrients.totalFat}g / {dailyFatGoal}g</Typography>
        </Box>

        <Box sx={{ textAlign: 'left', width: '100px' }}>
          <Typography variant="body2">Kohlenhydrate</Typography>
          <LinearProgress 
            variant="determinate" 
            value={totalNutrients.totalCarbs <= dailyCarbsGoal 
              ? (totalNutrients.totalCarbs / dailyCarbsGoal) * 100 
              : 100} 
            sx={{
              height: '10px',
              borderRadius: '5px',
              '& .MuiLinearProgress-bar': {
                borderRadius: '5px',
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          />
          <Typography variant="body2" sx={{color: 'grey'}}>{totalNutrients.totalCarbs}g / {dailyCarbsGoal}g</Typography>
        </Box>
      </Box>
      </div>


      {/* cards */}
      <Grid container spacing={2} sx={{ padding: '4vh 3vh 0 3vh', justifyContent: 'center' }}>
  {meals.map((meal, index) => (
    <Grid item xs={6} sm={6} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card 
        onClick={() => handleCardClick(meal.name)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '2vh 2vh 2vh 1vh',
          background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.gradient})`, 
          borderRadius: 10,
          position: 'relative',
          width: '100%', 
          maxWidth: '300px', 
        }}
      >
        <CardContent sx={{ flex: 1, zIndex: 1, minWidth: '200px' }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {mealTranslations[meal.name]}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">{meal.totalNutrients.calories} kcal</Typography>
            <Typography variant="body2">{meal.totalNutrients.protein}g Proteine</Typography>
            <Typography variant="body2">{meal.totalNutrients.fat}g Fett</Typography>
            <Typography variant="body2">{meal.totalNutrients.carbs}g Kohlenhydrate</Typography>
          </Box>
        </CardContent>
        <div className="HomeIconContainer">
          <Box sx={{zIndex: 0}}>
            <img 
              src={getMealIcon(meal.name)} 
              alt={meal.name} 
              style={{ width: '70%', height: 'auto' }}
            />
          </Box>
        </div>
      </Card>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default HomeComponent;