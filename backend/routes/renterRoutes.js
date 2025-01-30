// routes/renterRoutes.js
const express = require('express');
const { registerRenter, getAllRenters, loginRenter } = require('../controllers/renterController');
const router = express.Router();

// Register a new renter
router.post('/register', registerRenter);

// Login existing renter
router.post('/login', loginRenter);

// Get all renters
router.get('/', getAllRenters);

module.exports = router;
