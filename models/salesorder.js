const db = require('../firebase'); // Import the Firebase Firestore instance

const salesOrdersCollection = db.collection('salesOrders');

// Function to validate sales order data
const validateSalesOrderData = (data) => {
    if (!data.customerId || !data.productsOrdered || !data.orderDate || !data.orderType || !data.dueDate) {
        throw new Error('customerId, productsOrdered, orderDate, orderType, and dueDate are required fields');
    }

    return {
        customerId: data.customerId,
        productsOrdered: data.productsOrdered,
        orderDate: data.orderDate,
        orderType: data.orderType,
        dueDate: data.dueDate,
        Note: data.Note || null,
        priority: data.priority || 'Low',
    };
};

// Function to add a new sales order
const addSalesOrder = async (salesOrderData) => {
    try {
        const validatedData = validateSalesOrderData(salesOrderData);
        const docRef = await salesOrdersCollection.add(validatedData);
        return { id: docRef.id, ...validatedData };
    } catch (error) {
        throw new Error(`Failed to add sales order: ${error.message}`);
    }
};

// Function to get a sales order by ID
const getSalesOrderById = async (salesOrderId) => {
    try {
        const doc = await salesOrdersCollection.doc(salesOrderId).get();
        if (!doc.exists) {
            throw new Error('Sales order not found');
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw new Error(`Failed to get sales order: ${error.message}`);
    }
};

// Function to update a sales order
const updateSalesOrder = async (salesOrderId, updatedData) => {
    try {
        const validatedData = validateSalesOrderData(updatedData);
        const docRef = salesOrdersCollection.doc(salesOrderId);
        await docRef.update(validatedData);
        return { id: salesOrderId, ...validatedData };
    } catch (error) {
        throw new Error(`Failed to update sales order: ${error.message}`);
    }
};

// Function to delete a sales order
const deleteSalesOrder = async (salesOrderId) => {
    try {
        const docRef = salesOrdersCollection.doc(salesOrderId);
        await docRef.delete();
        return { id: salesOrderId };
    } catch (error) {
        throw new Error(`Failed to delete sales order: ${error.message}`);
    }
};

module.exports = {
    addSalesOrder,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder,
};
