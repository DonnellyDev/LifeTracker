// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const expenseSchemaDefiniton = {
    description: {
        type: String,
        required: true
    }
};

// Create a new mongoose schema
const expenseSchema = new mongoose.Schema(expenseSchemaDefiniton);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('expenseModels', expenseSchema);


