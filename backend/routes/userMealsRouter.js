// userMealsRouter.js
const express = require('express');
const {
    getUserMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
} = require('../controllers/userMealsController'); // Pfad zu deinem UserMealsController
const router = express.Router();

router.get('/:userId', getUserMeals); // GET all meals for a user
router.get('/meal/:id', getMeal); // GET a single meal by id
router.post('/', createMeal); // POST a new meal
router.delete('/:id', deleteMeal); // DELETE a meal by id
router.patch('/:id', updateMeal); // UPDATE a meal by id

module.exports = router;
