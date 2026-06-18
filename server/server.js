const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

//  import Route files 
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // JSON data 

// Routes register 
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Shop.co API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});