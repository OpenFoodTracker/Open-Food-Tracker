const express = require('express');
const {
    //getUserMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController.js'); // Angenommener Pfad zum Controller
const router = express.Router();

// GET all meals for a user
//router.get('/:userId', getUserMeals); // Routenparameter für userId
// GET a single meal by id
router.get('/single/:id', getMeal); // geändert von '/:id' zu '/single/:id', um Konflikte zu vermeiden
// POST a new meal
router.post('/', createMeal);
// DELETE a meal by id
router.delete('/:id', deleteMeal);
// UPDATE a meal by id
router.patch('/:id', updateMeal);

module.exports = router;
