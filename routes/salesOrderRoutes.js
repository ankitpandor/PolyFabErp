const express = require('express');
const router = express.Router();
const { addSalesOrder, getSalesOrderById, updateSalesOrder, deleteSalesOrder } = require('../models/salesorder');
const { getCustomerById } = require('../models/customer'); // Assuming you want to get full customer details

// Add a new sales order
router.post('/', async (req, res) => {
    try {
        const { customerId } = req.body;

        // Validate that the customer exists
        const customer = await getCustomerById(customerId);
        if (!customer) {
            return res.status(400).send('Invalid customer ID');
        }

        const newSalesOrder = await addSalesOrder(req.body);
        res.status(201).send(newSalesOrder);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get a sales order by ID
router.get('/:id', async (req, res) => {
    try {
        const salesOrder = await getSalesOrderById(req.params.id);
        if (!salesOrder) {
            return res.status(404).send('Sales order not found');
        }

        // Optionally fetch customer details
        const customer = await getCustomerById(salesOrder.customerId);
        if (customer) {
            salesOrder.CustomerDetail = customer;
        }

        res.send(salesOrder);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Edit a sales order
router.put('/:id', async (req, res) => {
    try {
        const { customerId } = req.body;

        // Validate that the customer exists
        const customer = await getCustomerById(customerId);
        if (!customer) {
            return res.status(400).send('Invalid customer ID');
        }

        const updatedSalesOrder = await updateSalesOrder(req.params.id, req.body);
        res.send(updatedSalesOrder);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Remove a sales order
router.delete('/:id', async (req, res) => {
    try {
        await deleteSalesOrder(req.params.id);
        res.send({ id: req.params.id });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
