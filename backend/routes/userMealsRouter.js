// userMealsRouter.js
const express = require('express');
const {
    getUserMeals,
    getMeal,
    getMealsByDate,
    getMealById,
    createMeal,
    deleteMeal,
    updateMeal,
    addMeal,
    getOccasionMeals,
    deleteOccasionMeal,
} = require('../controllers/userMealsController'); // Pfad zu deinem UserMealsController
const router = express.Router();

router.get('/:userId', getUserMeals); // GET all meals for a user
router.get('/meal/:id', getMeal); // GET a single meal by id
router.post('/occasion', getOccasionMeals); // GET a single meal by id
router.delete('/occasion/:id', deleteOccasionMeal);
router.get('/day/:userId/:date', getMealsByDate); // GET meals from a day for a user
router.post('/getMeal/:id', getMealById);
router.post('/', createMeal); // POST a new meal
router.delete('/:id', deleteMeal); // DELETE a meal by id
router.patch('/', addMeal); //  add a meal
router.patch('/:id', updateMeal); // UPDATE a meal by id


module.exports = router;
