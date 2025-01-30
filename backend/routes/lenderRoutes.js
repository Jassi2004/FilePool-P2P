const express = require('express');
const { registerLender, getAllLenders, loginLender, getLenderById } = require('../controllers/lenderController');
const router = express.Router();

// Register a new lender
router.post('/register', registerLender);

// Login an existing lender
router.post('/login', loginLender);

// getLenderById
router.post('/getLenderById', getLenderById);

// Get all lenders
router.get('/', getAllLenders);

module.exports = router;
