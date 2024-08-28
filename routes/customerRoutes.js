const express = require('express');
const router = express.Router();
const { addCustomer, getCustomerById, updateCustomer, deleteCustomer } = require('../models/customer');

// Add a new customer
router.post('/', async (req, res) => {
    try {
        const newCustomer = await addCustomer(req.body);
        res.status(201).send(newCustomer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.send(customer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Edit a customer
router.put('/:id', async (req, res) => {
    try {
        const updatedCustomer = await updateCustomer(req.params.id, req.body);
        res.send(updatedCustomer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Remove a customer
router.delete('/:id', async (req, res) => {
    try {
        await deleteCustomer(req.params.id);
        res.send({ id: req.params.id });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
