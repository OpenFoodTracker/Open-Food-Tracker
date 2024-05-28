// userRouter.js
const express = require('express');
const {
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController'); // Pfad zu deinem UserController
const router = express.Router();

router.post('/getUserByEmail', getUserByEmail); // GET a single user by email
router.post('/', createUser); // POST a new user
router.delete('/:id', deleteUser); // DELETE a user by id
router.patch('/:id', updateUser); // UPDATE a user by id

module.exports = router;
