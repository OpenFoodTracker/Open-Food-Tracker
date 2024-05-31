const { UserMeals, MealSchema } = require('../models/userMealModel');
const Meal = require('../models/mealModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

//Gets all Meals from the given UserMeals File, with the given occasion and userDate
const getOccasionMeals = async (req, res) => {
    const { mealsFileId, occasion, userDate } = req.body;

    const tempDate = new Date(userDate);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const date = new Date(tempDate.getFullYear(), tempDate.getMonth() , tempDate.getDate());

    try {
        const mealsFileObject = mongoose.Types.ObjectId(mealsFileId);                   

        const meals = await UserMeals.findOne(                      //finds all meals in the UserMeals with the given date
            { mealsFileId: mealsFileObject, "meals.date": date}, 
            { "meals.$": 1 }
        );

        if(meals){
            return res.status(200).json(meals.meals[0][occasion]);                              //returns the meals filtered by occasion
        } else {
            return res.status(204).json({});
        }

    } catch (error) {
      console.error('Fehler beim Holen von Mahlzeiten zu einer Gelegenheit:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

//Deletes Meal from UserMeals and as Object, specified by the id, the UserMeals File id, occasion and date
const deleteOccasionMeal = async (req, res) => {
    const { id } = req.params;
    const { mealsFileId, occasion, userDate } = req.body;

    const tempDate = new Date(userDate);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const date = new Date(tempDate.getFullYear(), tempDate.getMonth() , tempDate.getDate());

    try {
        const mealsFileObject = mongoose.Types.ObjectId(mealsFileId);       

        const updatedMeals = await UserMeals.findOneAndUpdate(                      //deletes meal from the UserMeals File
            { mealsFileId: mealsFileObject, "meals.date": date }, 
            { $pull: { [`meals.$.${occasion}`]: {_id: id}} }, 

        );

        let meal;
        if(updatedMeals){
            meal = await Meal.findOneAndDelete({ _id: id });                        //if successfull, delete the meal object
        } else {
            res.status(400).json({error: "No UserMeal Object with given ID"});
        }
        
        if(meal){
            res.status(200).json(meal);
        } else {
            res.status(400).json({error: "No Meal Object with given ID"});
        }
        
    } catch (error) {
      console.error('Fehler beim löschen einer Mahlzeit einer Gelegenheit:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

const getMealById = async (req, res) => {
    const { id } = req.params;
    const {user, occasion, date} = req.body;

    const tempDate = new Date(date);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const cleanedDate = new Date(tempDate.getFullYear(), tempDate.getMonth() , tempDate.getDate());

    try {
        const result = await UserMeals.findOne(
            {
              mealsFileId: mongoose.Types.ObjectId(user.mealsFileId),
              'meals.date': cleanedDate
            },
            {
              'meals.$': 1 // Only return the matched meal
            }
          );
      
          if (!result || !result.meals || result.meals.length === 0) {
            return null;
          }
      
          const meal = result.meals[0];
          const snack = meal[occasion].id(id);


      if (!snack) {
        return res.status(404).json({ message: 'Meal File not found' });
      }

      res.status(200).json(snack); 
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};


//Creates a Meal and sets it into the right Mealschema and UserMeal, 
//Creates a MealSchema for the current user date, if it does not exist
const addMeal = async (req, res) => {
    const { mealsFileId, mealData, occasion, userDate} = req.body; 

    const tempDate = new Date(userDate);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const day = tempDate.getDate();
    const month = tempDate.getMonth(); 
    const year = tempDate.getFullYear();

    date = new Date(year, month , day);

    try {
        const mealsFileObject = mongoose.Types.ObjectId(mealsFileId);                   

        //Creates Meal with given data
        const newMeal = await Meal.create({ name: mealData.name, amount: mealData.amount, unit: mealData.unit,                             
            kcal: mealData.kcal, protein: mealData.protein, fat: mealData.fat, carbs: mealData.carbs, id: mealData.id, imageUrl: mealData.imageUrl });

        const updatedMealsFile = await UserMeals.findOneAndUpdate(                      //if a MealSchema with current date already exists for this UserMeal File, add Meal there
            { mealsFileId: mealsFileObject, "meals.date": date }, 
            { $push: { [`meals.$.${occasion}`]: newMeal } }, 
            { new: true }
        );
        if(updatedMealsFile){
            return res.status(200).json(updatedMealsFile);                              //return updated File
        }

        const userMeal = await MealSchema.create({ date, [occasion]: newMeal});     //Creates MealSchema, if none for the current date exist for this UserMeal File

        const newMealsFile = await UserMeals.findOneAndUpdate(                          //Add MealSchema and Meal into UserMeals
            { mealsFileId: mealsFileObject }, 
            { $push: { meals: userMeal } }, 
            { new: true }, 
        );

        if(newMealsFile){
            return res.status(200).json(newMealsFile);                                 
        }
    } catch (error) {
      console.error('Fehler beim Erstellen von UserMeals:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
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

  
// update a meal
const updateMeal = async (req, res) => {
    const { id } = req.params;
    const {mealData, user, occasion, date} = req.body;

    const tempDate = new Date(date);                                                 //Sets up user Date and removes minutes, seconds, etc.
    const cleanedDate = new Date(tempDate.getFullYear(), tempDate.getMonth() , tempDate.getDate());

    try{
        let meal = await Meal.findOneAndUpdate({ _id: id }, {...mealData}, { new: true });

        if (!meal) {
            return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
        }


        meal = await UserMeals.findOneAndUpdate(
            {
                mealsFileId: user.mealsFileId,
                "meals.date": cleanedDate,
                [`meals.${occasion}._id`]: id
            },
            {
                $set: {
                    [`meals.$[mealElement].${occasion}.$[snackElement].kcal`]: mealData.Kalorien,
                    [`meals.$[mealElement].${occasion}.$[snackElement].amount`]: mealData.Menge,
                    [`meals.$[mealElement].${occasion}.$[snackElement].fat`]: mealData.Fett,
                    [`meals.$[mealElement].${occasion}.$[snackElement].carbs`]: mealData.Kohlenhydrate,
                    [`meals.$[mealElement].${occasion}.$[snackElement].protein`]: mealData.Proteine
                }
            },
            {
                arrayFilters: [
                    { "mealElement.date": cleanedDate },
                    { "snackElement._id": id }
                ],
                new: true
            }
        );

        if (!meal) {
            return res.status(404).json({error: 'Mahlzeit nicht gefunden'});
        }

        res.status(200).json(meal);

    } catch(error) {
        res.status(500).send(error.message);
    }
};



const getMealsByDate = async (req, res) => {
    const { userId, date } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send('Ungültige Benutzer-ID');
    }

    try {
        const userMeals = await UserMeals.findOne({ userId });

        if (!userMeals) {
            return res.status(404).send('Benutzer nicht gefunden');
        }

        // Konvertiere das übergebene Datum in das ISO-Format
        const requestedDate = new Date(date).toISOString().split('T')[0];

        // Finde die Mahlzeiten für das angegebene Datum
        const mealsForDate = userMeals.meals.find(meal => {
            const mealDate = new Date(meal.date).toISOString().split('T')[0];
            return mealDate === requestedDate;
        });

        if (!mealsForDate) {
            return res.status(404).send('Keine Mahlzeiten für dieses Datum gefunden');
        }

        res.status(200).json({
            breakfast: mealsForDate.breakfast,
            lunch: mealsForDate.lunch,
            dinner: mealsForDate.dinner,
            snack: mealsForDate.snack
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    getMealsByDate,
    getMealById,
    createMeal,
    updateMeal,
    addMeal,
    getOccasionMeals,
    deleteOccasionMeal,
};
