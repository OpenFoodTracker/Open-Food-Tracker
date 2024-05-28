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

router.post('/user/getOccasion', getOccasionMeals); 
router.delete('/user/occasion/:id', deleteOccasionMeal);
router.get('/user/day/:userId/:date', getMealsByDate); // GET meals from a day for a user
router.post('/user/getMeal/:id', getMealById);
router.post('/user/', createMeal); // POST a new meal
router.patch('/user/', addMeal); //  add a meal
router.patch('/user/:id', updateMeal); // UPDATE a meal by id


module.exports = router;
