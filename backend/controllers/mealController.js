const Meal = require('../models/mealModel')
const mongoose = require('mongoose')


// get all meals
const getMealsAll = async (req, res) => {
    try {
        const meals = await Meal.find().sort({ createdAt: -1 }); // Sortieren nach dem createdAt Feld in absteigender Reihenfolge
        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// get todays meals
const getMealsToday = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0); // Setzt die Zeit auf 00:00:00.000

    const endOfDay = new Date();
    endOfDay.setHours(23,59,59,999); // Setzt die Zeit auf 23:59:59.999

    try {
        const meals = await Meal.find({
            createdAt: {
                $gte: startOfDay, // Größer oder gleich Start des Tages
                $lte: endOfDay    // Kleiner oder gleich Ende des Tages
            }
        }).sort({createdAt: 1}); // Sortieren in aufsteigender Reihenfolge

        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


// get a single meal with id
const getMeal = async ( req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Falsy Id'})
    }

    const meal = await Meal.findById(id)

    if(!meal){
        return res.status(404).json({error: 'No such meal'})
    }

    res.status(200).json(meal)
}

// create new meal
const createMeal = async (req, res) => {
    const {title, kcal, occasion} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!kcal) {
        emptyFields.push('kcal')
    }
    if(!occasion) {
        emptyFields.push('occasion')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Bitte fülle die leeren Felder aus', emptyFields})
    }

    // Add body to db
    try{
        const meal = await Meal.create({title, kcal, occasion})
        res.status(200).json(meal)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a meal
const deleteMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Falsy Id'})
    }

    const meal = await Meal.findOneAndDelete({_id: id})

    if (!meal){
        return res.status(404).json({error: 'No such meal'})
    }

    res.status(200).json(meal)
}

// update a meal

const updateMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Falsy Id'})
    }

    const meal = await Meal.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!meal){
        return res.status(404).json({error: 'No such meal'})
    }

    res.status(200).json(meal)
}

module.exports = {
    getMealsAll,
    getMealsToday,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
}