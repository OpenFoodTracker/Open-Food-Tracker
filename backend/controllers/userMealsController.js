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

const createMeal = async (req, res) => {
    const { userId, meals } = req.body; // Hier wird das gesamte 'meals' Array genommen

    // Prüfen, ob alle notwendigen Felder vorhanden sind
    let emptyFields = [];
    if (!userId) emptyFields.push('userId');
    if (!meals || meals.length === 0) emptyFields.push('meals');

    meals.forEach(meal => {
        if (!meal.date) emptyFields.push('date');
        // Weitere Prüfungen für breakfast, lunch, etc. könnten hier hinzugefügt werden
    });

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Bitte fülle alle erforderlichen Felder aus', emptyFields });
    }

    try {
        const newMeals = await UserMeals.create({ userId, meals });
        res.status(200).json(newMeals);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    const {mealData, user, occasion, date} = req.body;
    console.log(mealData);
    console.log(user);
    console.log(date);
    console.log(occasion);

    //const tempDate = new Date(date);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const cleanedDate = new Date(date.getFullYear(), date.getMonth() , date.getDate());

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }
    const meal = await Meal.findOneAndUpdate({ _id: id }, {...mealData}, { new: true });

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    console.log("Update Meal Test");

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ungültige ID'});
    }

   meal = await UserMeals.findOneAndUpdate(
        { mealsFileId: user.mealsFileId, "meals.date": cleanedDate,  [meals.$.${occasion}._id]:id}, 
        { $set: {[meals.$.${occasion}]: mealData}},    //push
        { new: true }
    );

    if (!meal) {
        return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
    }

    if(req.body.amount) {

    }

    res.status(200).json(meal);
};


module.exports = {
    getUserMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
};
