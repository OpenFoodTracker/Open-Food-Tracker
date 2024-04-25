const mongoose = require('mongoose');
const ingredientSchema = require('./ingredientSchema'); // Pfad zum Ingredient-Schema

const recipeSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  ingredients: [ingredientSchema]
});

const userRecipesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  recipes: [recipeSchema]
});

module.exports = mongoose.model('UserRecipes', userRecipesSchema);
