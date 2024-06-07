// userMealsRouter.js
const express = require('express');
const {
    getMealsByDate,
    getMealById,
    createMeal,
    updateMeal,
    addMeal,
    getOccasionMeals,
    deleteOccasionMeal,
} = require('../controllers/userMealController'); // Pfad zu deinem UserMealsController
const router = express.Router();

router.post('/getOccasion', getOccasionMeals); 
router.delete('/occasion/:id', deleteOccasionMeal);
router.get('/day/:userId/:date', getMealsByDate); // GET meals from a day for a user
router.post('/getMeal/:id', getMealById);
router.post('/', createMeal); // POST a new meal
router.patch('/', addMeal); //  add a meal
router.patch('/:id', updateMeal); // UPDATE a meal by id


module.exports = router;














  return (
    <div>
      <div className="addMealHead">

        <Grid item xs={8} sx={{ textAlign: 'center',  padding: 2 }}>                             
          <Typography variant="h6">{format(selectedDate, 'dd.MM.yyyy')}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={2} container alignItems="center"> 
            <IconButton onClick={handlePrevDay}>
              <ArrowBack/>
            </IconButton>
          </Grid>


          {/* circular progress */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progressValue} size={140} thickness={4} sx={{ color: progressValue > 100 ? 'red' : 'primary' }} />
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
                {totalNutrients.totalCalories} kcal
              </Typography>
            </Box>
          </Box>

          <Grid item xs={2} container justifyContent="flex-end">
          {/*if next day in future, don't show arrow */}
            {selectedDate >= new Date() ? null : (
              <IconButton onClick={handleNextDay}>
                <ArrowForward />
            </IconButton>
            )}

          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} sx={{ padding: '4vh 3vh 0 3vh' }}>
        {meals.map((meal, index) => (
          <Grid item xs={6} sm={6} key={index}>
            <Card 
              onClick={() => handleCardClick(meal.name)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.gradient})`, 
                borderRadius: 10 
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2">{meal.totalNutrients.calories} kcal</Typography>
                  <Typography variant="body2">{meal.totalNutrients.protein}g Protein</Typography>
                  <Typography variant="body2">{meal.totalNutrients.fat}g Fat</Typography>
                  <Typography variant="body2">{meal.totalNutrients.carbs}g Carbs</Typography>
                </Box>
              </CardContent>
              {/* <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                {meal.icon}
              </Box> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeComponent;
