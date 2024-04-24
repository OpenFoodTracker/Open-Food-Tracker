const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  settings: {
    darkMode: { type: Boolean, required: true },
    notifications: { type: Boolean, required: true },
    gender: { type: String, required: true },
    weight: { type: String, required: true },
    goal: { type: String, required: true }
  },
  meals: [{
    id: { type: Schema.Types.ObjectId, ref: 'Meal' }
  }],
  history: [{
    mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
  }],
  favorites: [{
    mealId: { type: Schema.Types.ObjectId, ref: 'Meal' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
