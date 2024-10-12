const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'products.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get all products
app.get('/api/products', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to add a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const products = JSON.parse(data);
        products.push(newProduct);
        fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.status(201).send('Product added');
        });
    });
});

// Initialize data file if it doesn't exist
fs.exists(DATA_FILE, (exists) => {
    if (!exists) {
        fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), (err) => {
            if (err) {
                console.error('Error creating data file:', err);
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
