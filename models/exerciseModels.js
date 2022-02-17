// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const exerciseSchemaDefinition = {

};

// Create a new mongoose schema
const exerciseSchema = new mongoose.Schema(exerciseSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('exerciseModels', exerciseSchema);


