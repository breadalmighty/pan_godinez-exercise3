const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
const PORT = 3001;

let products = [];

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  };

// Start HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Product Service running on https://localhost:${PORT}`);
});

// POST - Add a new product
app.post('/products', (req, res) => {
    const product = { id: products.length + 1, ...req.body };
    products.push(product);
    res.status(201).json(product);
});

// GET - Get product details by ID
app.get('/products/:productId', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.productId));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// PUT - Update a product
app.put('/products/:productId', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.productId));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    Object.assign(product, req.body);
    res.json(product);
});

// DELETE - Delete a product
app.delete('/products/:productId', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.productId));
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(productIndex, 1);
    res.status(204).send();
});


