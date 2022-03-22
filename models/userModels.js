// Import mongoose
const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

// Create schema definition object
const userSchemaDefinition = { // Add field according to the needs of user
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,

    },
    // connecting user to their food tracker
    foodTracking:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"foodEntries"
    }],
    exerciseTracking:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"exerciseModels"
    }],
    expenseTracking:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"expenseModels"
    }]
};

// Create a new mongoose schema
const userSchema = new mongoose.Schema(userSchemaDefinition);

// Use passport-local-mongoose to indicate this is a special authentication model
// plugin() adds plm functionality to our model
// i.e. hashing/salting password, and handling authentication attempts
userSchema.plugin(plm);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('users', userSchema);


