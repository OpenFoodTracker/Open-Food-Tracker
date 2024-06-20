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
    getFullYearMeals,
} = require('../controllers/userMealController'); // Pfad zu deinem UserMealsController
const router = express.Router();

router.post('/getOccasion', getOccasionMeals); 
router.post('/yearMeal', getFullYearMeals)
router.delete('/occasion/:id', deleteOccasionMeal);
router.get('/day/:userId/:date', getMealsByDate); // GET meals from a day for a user
router.post('/getMeal/:id', getMealById);
router.post('/', createMeal); // POST a new meal
router.patch('/', addMeal); //  add a meal
router.patch('/:id', updateMeal); // UPDATE a meal by id


module.exports = router;










