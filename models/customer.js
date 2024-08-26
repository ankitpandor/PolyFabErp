const db = require('./firebase'); // Import the Firebase Firestore instance

const customersCollection = db.collection('customers');

// Function to validate customer data
const validateCustomerData = (data) => {
    if (!data.Name || !data.Address) {
        throw new Error('Name and Address are required fields');
    }

    return {
        Name: data.Name,
        Address: data.Address,
        GSTIN: data.GSTIN || null,
        Email: data.Email || null,
        Phone: data.Phone || null,
    };
};

// Function to add a new customer
const addCustomer = async (customerData) => {
    try {
        const validatedData = validateCustomerData(customerData);
        const docRef = await customersCollection.add(validatedData);
        return { id: docRef.id, ...validatedData };
    } catch (error) {
        throw new Error(`Failed to add customer: ${error.message}`);
    }
};

// Function to get a customer by ID
const getCustomerById = async (customerId) => {
    try {
        const doc = await customersCollection.doc(customerId).get();
        if (!doc.exists) {
            throw new Error('Customer not found');
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw new Error(`Failed to get customer: ${error.message}`);
    }
};

// Function to update a customer
const updateCustomer = async (customerId, updatedData) => {
    try {
        const validatedData = validateCustomerData(updatedData);
        const docRef = customersCollection.doc(customerId);
        await docRef.update(validatedData);
        return { id: customerId, ...validatedData };
    } catch (error) {
        throw new Error(`Failed to update customer: ${error.message}`);
    }
};

// Function to delete a customer
const deleteCustomer = async (customerId) => {
    try {
        const docRef = customersCollection.doc(customerId);
        await docRef.delete();
        return { id: customerId };
    } catch (error) {
        throw new Error(`Failed to delete customer: ${error.message}`);
    }
};

module.exports = {
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
