const UserRecipes = require('../models/userRecipesModel'); // Import des UserRecipesModel
const mongoose = require('mongoose');

// get all recipes for a user
const getUserRecipes = async (req, res) => {
    const { userId } = req.params; // Angenommen, wir filtern Rezepte basierend auf der userID

    if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({ error: 'Ungültige ID' });
    }

    try {
        const recipes = await UserRecipes.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ungültige ID'})
    }

    const recipe = await UserRecipes.findById(id);

    if (!recipe) {
        return res.status(404).json({error: 'Rezept nicht gefunden'});
    }

    res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
    const { userId, recipes } = req.body;

    // Überprüfen, ob sowohl userId als auch recipes im Request-Body vorhanden sind
    if (!userId || !recipes || recipes.length === 0) {
        return res.status(400).json({ error: 'Bitte füllen Sie alle erforderlichen Felder aus und stellen Sie sicher, dass Rezepte enthalten sind.' });
    }

    // Überprüfen, ob jedes Rezept die notwendigen Zutaten hat
    let missingIngredients = recipes.some(recipe => !recipe.ingredients || recipe.ingredients.length === 0);
    if (missingIngredients) {
        return res.status(400).json({ error: 'Jedes Rezept muss Zutaten enthalten.' });
    }

    try {
        // Erstellen eines neuen Eintrags in der UserRecipes Sammlung
        const userRecipe = await UserRecipes.create({ userId, recipes });
        res.status(200).json(userRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const recipe = await UserRecipes.findOneAndDelete({ _id: id });

    if (!recipe) {
        return res.status(404).json({error: 'Rezept nicht gefunden'});
    }

    res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const recipe = await UserRecipes.findOneAndUpdate({ _id: id }, {...req.body}, { new: true });

    if (!recipe) {
        return res.status(404).json({error: 'Rezept nicht gefunden'});
    }

    res.status(200).json(recipe);
};

module.exports = {
    getUserRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
};
