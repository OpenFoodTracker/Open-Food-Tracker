const { UserMeals, MealSchema } = require('../models/userMealsModel');
const Meal = require('../models/mealModel');
const User = require('../models/userModel');
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

const getIngredient = async (req, res) => {
    const { id } = req.params;

    let ingredientData = {};
    ingredientData.unitUnknown = false;

    await fetch(`https://world.openfoodfacts.net/api/v2/product/${id}?fields=product_name,nutriments,product_quantity_unit,quantity,image_front_url`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json(); 
        })
        .then(data => {
            const product = data.product;
            ingredientData.id = id;
            ingredientData.name = product.product_name;
            ingredientData.kcal = product.nutriments['energy-kcal_100g'];
            ingredientData.protein = product.nutriments.proteins_100g;
            ingredientData.fat = product.nutriments.fat_100g;
            ingredientData.carbs = product.nutriments.carbohydrates_100g;
            ingredientData.imageUrl = product.image_front_url;
            ingredientData.unit = product.product_quantity_unit;
            if(!ingredientData.unit){
                const tempUnit = product.quantity;
                ingredientData.unit = tempUnit; 
                ingredientData.unitUnknown = true;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return res.status(400).json({ error: 'Ein Fehler ist beim Zugriff auf OpenFoodFacts aufgetreten'});
    });

    try {
        console.log(ingredientData);
        return res.status(200).json(ingredientData);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};


const createMeal = async (req, res) => {
    const { userId, mealData, occasion, amount, userDate} = req.body; // Hier wird das gesamte 'meals' Array genommen

    //let name;
    //let kcal;
    //let protein;
    //let fat;
    //let carbs;
    //let unit;
    //let date = new Date();

    const day = userDate.getDate() + 1;
    const month = userDate.getMonth(); 
    const year = userDate.getFullYear();

    date = new Date(year, month , day);

    //await fetch(`https://world.openfoodfacts.net/api/v2/product/${mealId}?fields=product_name,nutriments`)
    //    .then(response => {
    //        if (!response.ok) {
    //            throw new Error('Network response was not ok');
    //        }
            
    //        return response.json(); 
    //    })
    //    .then(data => {
    //        const product = data.product;
    //        name = product.product_name;
    //        kcal = product.nutriments['energy-kcal_100g'] * parseInt(amount)/100;
    //        protein = product.nutriments.proteins_100g * parseInt(amount)/100;
    //        fat = product.nutriments.fat_100g * parseInt(amount)/100;
    //        carbs = product.nutriments.carbohydrates_100g * parseInt(amount)/100;
    //        unit = product.nutriments.proteins_unit;
    //        
    //        
    //    })
    //    .catch(error => {
    //        console.error('There was a problem with the fetch operation:', error);
    //        return res.status(400).json({ error: 'Ein Fehler ist beim Zugriff auf OpenFoodFacts aufgetreten'});
    //});

    //return res.status(200).json({ userID, mealID, occasion, amount });

    // Prüfen, ob alle notwendigen Felder vorhanden sind
    //let emptyFields = [];
    //if (!userId) emptyFields.push('userId');
    //if (!meals || meals.length === 0) emptyFields.push('meals');


    //if (emptyFields.length > 0) {
    //    return res.status(400).json({ error: 'Bitte fülle alle erforderlichen Felder aus', emptyFields });
    //}

    try {
        const user = await User.findOne({userId: userId});
        if(!user){
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        const mealsFileId = user.toJSON().mealsFileId.toString();
        //const mealsFile = await UserMeals.findById(mealsFileId);
        const mealsFile = await UserMeals.findById('663180d90c34a3b1660af60a');

        if(!mealsFile){
            mealsFile = await UserMeals.create({ _id: mealsFileId, userId })
        }

        const newMeal = await Meal.create({ name: mealData.name, amount: mealData.amount, unit: mealData.unit,
            kcal: mealData.kcal, protein: mealData.protein, fat: mealData.fat, carbs: mealData.carbs });

        //const newMeal = await Meal.create({ name: mealData.name, amount: mealData.amount, unit: mealData.unit,
        //    kcal: mealData.kcal, protein: mealData.protein, fat: mealData.fat, carbs: mealData.carbs });

        const updatedMealsFile = await UserMeals.findOneAndUpdate(
            { _id: mealsFile._id, "meals.date": date }, 
            { $push: { [`meals.$.${occasion}`]: newMeal } }, 
            { new: true }
        );
        if(updatedMealsFile){
            return res.status(200).json(updatedMealsFile);
        }

        const userMeal = await MealSchema.create({ date, [occasion]: newMeal});

        updatedMealsFile = await UserMeals.findOneAndUpdate(
            { _id: mealsFile._id }, 
            { $push: { meals: userMeal } }, 
            { new: true }, 
        );

        return res.status(200).json(updatedMealsFile);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
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
    createMeal,
    deleteMeal,
    updateMeal,
    getIngredient,
};
