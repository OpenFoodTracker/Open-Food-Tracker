const mongoose = require('mongoose');
const ingredientSchema = require('./path/to/ingredientSchema'); // Pfad zum Ingredient-Schema

const mealSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  breakfast: [ingredientSchema],
  lunch: [ingredientSchema],
  dinner: [ingredientSchema],
  snack: [ingredientSchema]
});

const userMealsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true },
  meals: [mealSchema]
});

module.exports = mongoose.model('UserMeals', userMealsSchema);
