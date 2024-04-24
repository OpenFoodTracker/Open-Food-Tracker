const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMealSchema = new Schema({
  date: { type: Date, required: true },
  meals: {
    breakfast: [{
      mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
    }],
    lunch: [{
      mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
    }],
    dinner: [{
      mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
    }],
    snack: [{
      mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('UserMeals', userMealSchema);
