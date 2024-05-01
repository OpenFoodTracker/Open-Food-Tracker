const mongoose = require('mongoose');
const soloMealSchema = require('./mealSchema');

const mealSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  breakfast: [soloMealSchema],
  lunch: [soloMealSchema],
  dinner: [soloMealSchema],
  snack: [soloMealSchema]
});

const userMealsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  meals: [mealSchema]
});

const UserMeals = mongoose.model('UserMeals', userMealsSchema);
module.exports = UserMeals;
