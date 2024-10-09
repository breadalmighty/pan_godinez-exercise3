const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
app.use(express.json());
const PORT = 3002;

let customers = [];

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  };

// Start HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Customer Service running on https://localhost:${PORT}`);
});

// POST - Add a new customer
app.post('/customers', (req, res) => {
    const customer = { id: customers.length + 1, ...req.body };
    customers.push(customer);
    res.status(201).json(customer);
});

// GET - Get customer details by ID
app.get('/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    res.json(customer);
});

// PUT - Update customer information
app.put('/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    Object.assign(customer, req.body);
    res.json(customer);
});

// DELETE - Delete a customer
app.delete('/customers/:customerId', (req, res) => {
    customers = customers.filter(c => c.id !== parseInt(req.params.customerId));
    res.status(204).send();
});
