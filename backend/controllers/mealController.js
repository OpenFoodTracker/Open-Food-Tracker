const Meal = require('../models/mealModel'); // Import des MealModel
const mongoose = require('mongoose');

// Eine einzelne Mahlzeit abrufen
const getMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await Meal.findById(id);

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json(meal);
};

// Eine neue Mahlzeit erstellen
const createMeal = async (req, res) => {
    const { name, amount, unit, kcal, protein, fat, carbs } = req.body;

    if (!name || !amount || !unit || !kcal || !protein || !fat || !carbs) {
        return res.status(400).json({ error: 'Bitte füllen Sie alle Felder aus' });
    }

    try {
        const meal = await Meal.create({ name, amount, unit, kcal, protein, fat, carbs });
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eine Mahlzeit löschen
const deleteMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await Meal.findOneAndDelete({ _id: id });

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json({ message: 'Mahlzeit erfolgreich gelöscht' });
};

// Eine Mahlzeit aktualisieren
const updateMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const meal = await Meal.findOneAndUpdate({ _id: id }, {...req.body}, { new: true });

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    res.status(200).json(meal);
};

module.exports = {
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
};
