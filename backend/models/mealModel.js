const mongoose = require('mongoose');

const soloMealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  kcal: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  id: { type: Number, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

const Meal = mongoose.model('Meal', soloMealSchema);
module.exports = Meal;

