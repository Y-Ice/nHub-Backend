const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// middleware to parse JSON bodies
app.use(express.json());

// Import user routes
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})