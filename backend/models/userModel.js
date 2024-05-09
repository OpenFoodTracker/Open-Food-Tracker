const mongoose = require('mongoose');
const mealSchema = require('./mealSchema'); // Pfad zum Ingredient-Schema

const userSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  birthday: { type: Date, required: true },
  goal: { type: Number, required: true },
  darkMode: { type: Boolean, default: true },
  notifications: { type: Boolean, default: true },
  recipeFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRecipes' },
  mealsFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMeals' },
  history: [mealSchema],
  favorites: [mealSchema]
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
