// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const foodSchemaDefinition = {

};

// Create a new mongoose schema
const foodScheme = new mongoose.Schema(foodSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('foodModels', foodScheme);



