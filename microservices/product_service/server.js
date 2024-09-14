const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

let products = [];

// POST - add a new product
app.post('/products', (req, res) => {
    const product = { id: products.length + 1, ...req.body };
    products.push(product);
    res.status(201).json(product);
});

// GET - get product details by ID
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

app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
});
