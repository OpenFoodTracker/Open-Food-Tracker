const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  mealId: {
    type: Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  kcal: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
