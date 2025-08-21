require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Add this line

// Connect to database
connectDB();

const app = express();

app.use(cors()); // Add this line to enable CORS

// Middleware
app.use(express.json());

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/rank', require('./routes/rankRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling middleware
app.use(errorHandler);