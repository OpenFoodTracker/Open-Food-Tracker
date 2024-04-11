const express = require('express')
const {
    getMealsAll,
    getMealsToday,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController.js')
const router = express.Router()

// GET all meals
router.get('/', getMealsAll)

// GET all meals from today
router.get('/today', getMealsToday)

// GET single meal from today
router.get('/:id', getMeal)

// POST a new meal
router.post('/', createMeal)

// DELETE a new meal
router.delete('/:id', deleteMeal)

// UPDATE a meal
router.patch('/:id', updateMeal)


module.exports = router