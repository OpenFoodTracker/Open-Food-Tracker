const cors = require('cors');


const express = require('express');
const {
    getRouteParameter
} = require('../controllers/tempController'); // Pfad zu tempController
const router = express.Router();

router.use(cors());
router.get('/:barcode/:weight', getRouteParameter); // GET a single user by id

module.exports = router;