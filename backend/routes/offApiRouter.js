const express = require('express');
const {
    getIngredient,
    searchIngredients,
} = require('../controllers/offApiController.js'); 
const router = express.Router();

router.get('/ingredient/:id', getIngredient);
router.get('/search/:name', searchIngredients);

module.exports = router;
