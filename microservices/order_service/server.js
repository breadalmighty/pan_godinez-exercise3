const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
const PORT = 3003;

let orders = [];

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
};

// Start HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
    console.log(`Order Service running on https://localhost:${PORT}`);
});

// POST - Create a new order
app.post('/orders', async (req, res) => {
    const { customerId, productId } = req.body;

    try {
        // Verify customer exists
        const customerResponse = await axios.get(`https://localhost:3002/customers/${customerId}`, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        if (!customerResponse.data) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Verify product exists
        const productResponse = await axios.get(`https://localhost:3001/products/${productId}`, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        if (!productResponse.data) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const order = { id: orders.length + 1, customerId, productId, ...req.body };
        orders.push(order);
        res.status(201).json(order);

    } catch (error) {
        console.error('Error creating order:', error.message); 
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// GET - Get order details by ID
app.get('/orders/:orderId', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.orderId));
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// PUT - Update an order
app.put('/orders/:orderId', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.orderId));
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    Object.assign(order, req.body);
    res.json(order);
});

// DELETE - Delete an order
app.delete('/orders/:orderId', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.orderId));
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    orders.splice(orderIndex, 1);
    res.status(204).send();
});
