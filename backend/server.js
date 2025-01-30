// server.js
const express = require('express');
const cors = require('cors'); // Import cors
const http = require('http'); // Import http for creating the server
const socketIo = require('socket.io'); // Import socket.io
const renterRoutes = require('./routes/renterRoutes');
const lenderRoutes = require('./routes/lenderRoutes'); // If you have lender routes
require('dotenv').config();
const connectDb = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Change to your frontend URL if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json());

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.io

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('offer', (data) => {
        socket.to(data.to).emit('offer', { offer: data.offer, from: socket.id });
    });

    socket.on('answer', (data) => {
        socket.to(data.to).emit('answer', { answer: data.answer, from: socket.id });
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.to).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Routes
app.use('/api/renters', renterRoutes);
app.use('/api/lenders', lenderRoutes); // If you have lender routes

// MongoDB Connection
connectDb();

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
