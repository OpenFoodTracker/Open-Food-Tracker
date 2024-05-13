// userMealsRouter.js
const express = require('express');
const {
    getUserMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal,
    getIngredient,
} = require('../controllers/userMealsController'); // Pfad zu deinem UserMealsController
const router = express.Router();

router.get('/:userId', getUserMeals); // GET all meals for a user
router.get('/meal/:id', getMeal); // GET a single meal by id
router.get('/ingredient/:id', getIngredient)
router.post('/', createMeal); // POST a new meal
router.delete('/:id', deleteMeal); // DELETE a meal by id
router.patch('/:id', updateMeal); // UPDATE a meal by id
router.patch('/addMealDay/:userId', async (req, res) => {
    const { userId } = req.params;
    const newMealDay = req.body; // Dies sollte das oben gezeigte Objekt sein

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send('Ungültige Benutzer-ID');
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { meals: newMealDay }},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('Benutzer nicht gefunden');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
