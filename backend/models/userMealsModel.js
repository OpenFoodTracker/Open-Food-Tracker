const mongoose = require('mongoose');
const soloMealSchema = require('./mealSchema');

const mealSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  breakfast: { type: [soloMealSchema], default: [] },
  lunch: { type: [soloMealSchema], default: [] },
  dinner: { type: [soloMealSchema], default: [] },
  snack: { type: [soloMealSchema], default: [] }
});

const userMealsSchema = new mongoose.Schema({
  mealsFileId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  meals: { type: [mealSchema], default: [] }
});

module.exports = mongoose.model('UserMeals', userMealsSchema);
