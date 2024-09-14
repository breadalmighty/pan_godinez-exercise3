const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Customer Service running on port ${PORT}`);
});


let customers = [];

// POST - add new customer
app.post('/customers', (req, res) => {
    const customer = { id: customers.length + 1, ...req.body };
    customers.push(customer);
    res.status(201).json(customer);
});

// GET - get customer details by ID
app.get('/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    res.json(customer);
});

// PUT - date customer information
app.put('/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    Object.assign(customer, req.body);
    res.json(customer);
});

// DELETE - delete a customer
app.delete('/customers/:customerId', (req, res) => {
    customers = customers.filter(c => c.id !== parseInt(req.params.customerId));
    res.status(204).send();
});

