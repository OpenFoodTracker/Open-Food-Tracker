const mongoose = require('mongoose');
const mealSchema = require('./mealSchema'); // Pfad zum Ingredient-Schema

const recipeSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  ingredients: [mealSchema]
});

const userRecipesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  name: { type: String, required: true },
  recipes: [recipeSchema]
});

module.exports = mongoose.model('UserRecipes', userRecipesSchema);
