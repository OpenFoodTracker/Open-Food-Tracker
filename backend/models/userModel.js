const mongoose = require('mongoose');
const ingredientSchema = require('./ingredientModel'); // Pfad zum Ingredient-Schema

const userSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  birthday: { type: Date, required: true },
  goal: { type: Number, required: true },
  darkMode: { type: Boolean, default: false },
  notifications: { type: Boolean, default: true },
  recipeFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRecipes' },
  mealsFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMeals' },
  history: [ingredientSchema],
  favorites: [ingredientSchema]
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
