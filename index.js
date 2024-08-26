const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Make sure to import cors
const db = require('./firebase'); // Import the Firebase Firestore instance

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add cors middleware

const customersCollection = db.collection('customers');

// Add a new customer
app.post('/customer', async (req, res) => {
    try {
        const newCustomer = req.body;
        const docRef = await customersCollection.add(newCustomer);
        res.status(201).send({ id: docRef.id, ...newCustomer });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get a customer by ID
app.get('/customer/:id', async (req, res) => {
    try {
        const doc = await customersCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('Customer not found');
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit a customer
app.put('/customer/:id', async (req, res) => {
    try {
        const updatedCustomer = req.body;
        const docRef = customersCollection.doc(req.params.id);
        await docRef.update(updatedCustomer);
        res.send({ id: req.params.id, ...updatedCustomer });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Remove a customer
app.delete('/customer/:id', async (req, res) => {
    try {
        const docRef = customersCollection.doc(req.params.id);
        await docRef.delete();
        res.send({ id: req.params.id });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


//hello this is for practice
