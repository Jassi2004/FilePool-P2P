const Lender = require('../models/Lender');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// JWT secret (store this securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register Lender
exports.registerLender = async (req, res) => {
    try {
        const { firstName, lastName, email, password, storageCapacity, maxRentalDuration } = req.body;

        // Validate input fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Check if the email is already registered
        const existingLender = await Lender.findOne({ email });
        if (existingLender) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new lender
        const newLender = new Lender({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            storageCapacity,
            maxRentalDuration,
        });

        // Save the lender to the database
        await newLender.save();

        res.status(201).json({ message: 'Lender registered successfully!', lender: newLender });

    } catch (error) {
        console.error("Error registering lender:", error);
        res.status(500).json({ error: error.message });
    }
};

// Login Lender
exports.loginLender = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the lender by email
        const lender = await Lender.findOne({ email });
        if (!lender) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, lender.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: lender._id, email: lender.email },
            JWT_SECRET,
        );

        res.status(200).json({ message: 'Login successful!', token, lender });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get All Lenders
exports.getAllLenders = async (req, res) => {
    try {
        const lenders = await Lender.find();
        res.status(200).json(lenders);
    } catch (error) {
        console.error("Error fetching lenders:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Lender by ID (optional)
exports.getLenderById = async (req, res) => {
    try {
        const { id } = req.params;

        const lender = await Lender.findById(id);
        if (!lender) {
            return res.status(404).json({ message: 'Lender not found.' });
        }

        res.status(200).json(lender);
    } catch (error) {
        console.error("Error fetching lender by ID:", error);
        res.status(500).json({ error: error.message });
    }
};
