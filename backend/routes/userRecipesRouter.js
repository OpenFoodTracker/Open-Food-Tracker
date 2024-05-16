// userRecipesRouter.js
const express = require('express');
const {
    getUserRecipes,
    getRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe
} = require('../controllers/userRecipesController'); // Pfad zu deinem UserRecipesController
const router = express.Router();

router.get('/:userId', getUserRecipes); // GET all recipes for a user
router.get('/recipe/:id', getRecipe); // GET a single recipe by id
router.post('/getRecipeById', getRecipeById); // GET a single recipe by id
router.post('/', createRecipe); // POST a new recipe
router.delete('/:id', deleteRecipe); // DELETE a recipe by id
router.patch('/:id', updateRecipe); // UPDATE a recipe by id

module.exports = router;
