// Import mongoose
const mongoose = require('mongoose');


// Create schema definition object
const exerciseSchemaDefinition = {
    exerciseName: {
        type: String,
        enum: ['WALKING', 'JOGGING', 'YOGA', 'PUSH-UPS', 'SQUATS'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    caloriesBurnt: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
};

// Create a new mongoose schema
const exerciseSchema = new mongoose.Schema(exerciseSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = mongoose.model('exerciseModels', exerciseSchema);


