const express = require('express');
const {
    //getUserMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController.js'); // Angenommener Pfad zum Controller
const router = express.Router();


router.get('/single/:id', getMeal); 
router.post('/', createMeal);
router.delete('/:id', deleteMeal);
router.patch('/:id', updateMeal);

module.exports = router;
