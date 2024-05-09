const mongoose = require('mongoose');

const soloMealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  kcal: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true }
}, { timestamps: true });

module.exports = soloMealSchema; // Exportiere nur das Schema

