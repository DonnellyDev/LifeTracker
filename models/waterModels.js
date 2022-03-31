// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const waterSchemaDefinition = {
    typeOfLiquid: {
        type: String,
        required: true
    },
    yourCurrentWeight: {
        type: String,
    },
    intakeAmount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    intakeTimeOfDay: {
        type: String,
        enum: ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'],
        required: true
    },
    intakeTime: {
        type: String,
        required: true
    }
};

// Create a new mongoose schema
const waterSchema = new mongoose.Schema(waterSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('waterModels', waterSchema);


