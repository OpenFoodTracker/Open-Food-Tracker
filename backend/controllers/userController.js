const User  = require('../models/userModel'); // Import des UserModel
const mongoose = require('mongoose');

// get all users
const getUsersAll = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a single user with id
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ungültige ID'})
    }

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({error: 'Benutzer nicht gefunden'})
    }

    res.status(200).json(user);
};

const createUser = async (req, res) => {
    // Zerlegen des Request-Bodys, um die einzelnen Felder zu erhalten
    const { userId, gender, height, weight, birthday, goal, darkMode, notifications, recipeFileId, mealsFileId, history, favorites } = req.body;

    // Überprüfen, ob alle notwendigen Felder vorhanden sind
    let missingFields = [];
    if (!userId) missingFields.push("userId");
    if (!gender) missingFields.push("gender");
    if (!height) missingFields.push("height");
    if (!weight) missingFields.push("weight");
    if (!birthday) missingFields.push("birthday");
    if (!goal) missingFields.push("goal");
    if (darkMode === undefined) missingFields.push("darkMode");
    if (notifications === undefined) missingFields.push("notifications");
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'Bitte füllen Sie alle erforderlichen Felder aus', missingFields });
    }

    try {
        // Erstellen eines neuen Benutzers mit den spezifizierten Daten
        const user = await User.create({
            userId, gender, height, weight, birthday, goal, darkMode, notifications, recipeFileId, mealsFileId, history, favorites
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Ungültige ID'});
    }

    const user = await User.findOneAndDelete({_id: id});

    if (!user){
        return res.status(404).json({error: 'Benutzer nicht gefunden'});
    }

    res.status(200).json(user);
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Ungültige ID' });
    }

    const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: {...req.body} },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.status(200).json(user);
};


module.exports = {
    getUsersAll,
    getUser,
    createUser,
    deleteUser,
    updateUser
};
