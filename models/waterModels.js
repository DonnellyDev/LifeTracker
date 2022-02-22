// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const waterSchemaDefinition = {
    name:{
        type:String,
        required :true
    },
    quantity:{
        type:Number,
        required: true
    },

};

// Create a new mongoose schema
const waterSchema = new mongoose.Schema(waterSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('waterModels', waterSchema);


