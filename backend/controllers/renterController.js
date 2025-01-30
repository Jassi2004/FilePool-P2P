const Renter = require('../models/Renter');
const bcrypt = require('bcrypt');

// Register Renter
exports.registerRenter = async (req, res) => {
    try {
        const { firstName, lastName, email, password, storageNeeded, rentalDuration } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !storageNeeded || !rentalDuration) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check for existing renter by email
        const existingRenter = await Renter.findOne({ email });
        if (existingRenter) {
            return res.status(400).json({ message: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newRenter = new Renter({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            storageNeeded,
            rentalDuration,
        });

        await newRenter.save();
        res.status(201).json({ message: 'Renter registered successfully!' });

    } catch (error) {
        console.error("Registration error:", error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

// Login Renter
// Backend: Login Renter
exports.loginRenter = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const renter = await Renter.findOne({ email });
        if (!renter) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, renter.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Include a success flag in the response
        res.status(200).json({
            success: true,  // Added success flag
            message: "Login successful!",
            renter,
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get All Renters
exports.getAllRenters = async (req, res) => {
    try {
        const renters = await Renter.find();
        res.status(200).json(renters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
