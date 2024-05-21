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

// get a single user with email
const getUserByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
};



const createUser = async (req, res) => {
    const { email, gender, height, weight, birthday, goal, darkMode, notifications, history, favorites } = req.body;

    try {
        // Erstellen eines neuen Benutzers mit den spezifizierten Daten
        const user = await User.create({
            email, gender, height, weight, birthday, goal, darkMode, notifications,
            recipeFileId: new mongoose.Types.ObjectId(), // Generiert eine neue ObjectId
            mealsFileId: new mongoose.Types.ObjectId(), // Generiert eine neue ObjectId
            history, favorites
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
    console.log("id: " + id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Ungültige ID' });
    }

    try {
        const user = await User.findOneAndUpdate(

            console.log("findOneAndUpdate"),
            
            { _id: id },
            console.log("findOne id: " + id),
            { $set: { ...req.body } },
            { new: true, runValidators: true },
            { new: true, runValidators: true, useFindAndModify: false } //useFindAndModify set to false
        );

        if (!user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Benutzers', details: error });
    }
};

module.exports = {
    getUsersAll,
    getUser,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser
};
