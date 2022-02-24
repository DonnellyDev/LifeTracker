// Import mongoose
const mongoose = require('mongoose');

// Create schema definition object
const exerciseSchemaDefinition = {
    exerciseName: {
        type: String,
        enum: ['Walking', 'Jogging', 'Yoga', 'Push-ups', 'Squats'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    calorisBurn: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongo.Schema.Types.ObjectId,
        ref: "User"
    }
};

// Create a new mongoose schema
const exerciseSchema = new mongoose.Schema(exerciseSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('exerciseModels', exerciseSchema);


