const UserMeals = require('../models/userMealsModel');
const mongoose = require('mongoose');

// get all meals for a user
const getUserMeals = async (req, res) => {
    const { userId } = req.params; // Angenommen, wir filtern Mahlzeiten basierend auf der userId

    if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({ error: 'Ungültige ID' });
    }

    try {
        const meals = await UserMeals.find({ userID: userId }).sort({ date: -1 });
        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a single meal
const getMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await UserMeals.findById(id);

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json(meal);
};

const getMealById = async (req, res) => {
    const { mealsFileId } = req.body;

    try {
      const meal = await UserMeals.findOne({ mealsFileId: mealsFileId });
      if (!meal) {
        return res.status(404).json({ message: 'Meal File not found' });
      }
      res.status(200).json(meal); // Senden Sie die gefundene Mahlzeit zurück
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

const createMeal = async (req, res) => {

    const { mealsFileId, userId, meals } = req.body;

    if (!mealsFileId) {
      return res.status(400).json({ error: 'mealsFileId ist erforderlich' });
    }
  
    if (!userId) {
      return res.status(400).json({ error: 'userId ist erforderlich' });
    }
  
    try {
      const newUserMeals = new UserMeals({ mealsFileId, userId, meals });
      await newUserMeals.save();
      res.status(201).json(newUserMeals);
    } catch (error) {
      console.error('Fehler beim Erstellen von UserMeals:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    }
  };

// delete a meal
const deleteMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await UserMeals.findOneAndDelete({ _id: id });

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json(meal);
};

// update a meal
const updateMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await UserMeals.findOneAndUpdate({ _id: id }, {...req.body}, { new: true });

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json(meal);
};

module.exports = {
    getUserMeals,
    getMeal,
    getMealById,
    createMeal,
    deleteMeal,
    updateMeal
};
