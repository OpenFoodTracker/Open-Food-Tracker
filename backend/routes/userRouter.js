// userRouter.js
const express = require('express');
const {
    getUsersAll,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController'); // Pfad zu deinem UserController
const router = express.Router();

router.get('/', getUsersAll); // GET all users
router.get('/:id', getUser); // GET a single user by id
router.post('/', createUser); // POST a new user
router.delete('/:id', deleteUser); // DELETE a user by id
router.patch('/:id', updateUser); // UPDATE a user by id

module.exports = router;
