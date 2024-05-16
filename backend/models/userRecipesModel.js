const mongoose = require('mongoose');
const mealSchema = require('./mealSchema'); // Pfad zum Ingredient-Schema

const recipeSchema = new mongoose.Schema({
  // recipeId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Entfernen Sie dieses Feld
  name: { type: String, required: true },
  ingredients: [mealSchema]
});

const userRecipesSchema = new mongoose.Schema({
  recipeFileId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipes: { type: [recipeSchema], default: [] }
});

module.exports = mongoose.model('UserRecipes', userRecipesSchema);
