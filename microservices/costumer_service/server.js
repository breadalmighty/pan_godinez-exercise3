const express = require('express');
const https = require('https');
const fs = require('fs');
const Joi = require('joi');  
const app = express();
app.use(express.json());
const PORT = 3002;

let customers = [];

// HTTPS server with OPENSSL key and cert
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
};
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Customer Service running on https://localhost:${PORT}`);
});


// Customer validation 
const customerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
});

// POST - Add a new customer
app.post('/customers', (req, res) => {
    const { error } = customerSchema.validate(req.body);  
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const customer = { id: customers.length + 1, ...req.body };
    customers.push(customer);
    res.status(201).json(customer);
});

// PUT - Update customer information
app.put('/customers/:customerId', (req, res) => {
    const { error } = customerSchema.validate(req.body);  
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    Object.assign(customer, req.body);
    res.json(customer);
});


// GET - Get customer details by ID
app.get('/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    if (!customer) return res.status(404).send('Customer not found.');
    res.json(customer);
});

// DELETE - Delete a customer
app.delete('/customers/:customerId', (req, res) => {
    customers = customers.filter(c => c.id !== parseInt(req.params.customerId));
    res.status(204).send();
});
