const UserRecipes = require('../models/userRecipeModel'); // Import des UserRecipesModel
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

const getRecipeById = async (req, res) => {
    const { recipeFileId } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(recipeFileId)) {
      return res.status(400).json({ message: 'Ungültige ID' });
    }
  
    try {
      const recipe = await UserRecipes.findOne({ recipeFileId: recipeFileId });
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe File not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

const createRecipe = async (req, res) => {
    const { recipeFileId, userId, recipes } = req.body;

    if (!recipeFileId) {
        return res.status(400).json({ error: 'recipeFileId ist erforderlich' });
    }

    if (!userId) {
        return res.status(400).json({ error: 'userId ist erforderlich' });
    }

    try {
        const newUserRecipes = new UserRecipes({ recipeFileId, userId, recipes });
        await newUserRecipes.save();
        res.status(201).json(newUserRecipes);
    } catch (error) {
        console.error('Fehler beim Erstellen von UserRecipes:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
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
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe
};
