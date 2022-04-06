// Import mongoose
const mongoose = require('mongoose');
const foodTracking = require('./foodModels').schema;
const exerciseTracking = require('./exerciseModels').schema;
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
    Personals: {
        type:Object,
        name:
            {
                firstName: String,
                lastName: String
            },
            required: true
    },
    // connecting user to their food tracker
    foodTracking:[foodTracking],
    exerciseTracking:[exerciseTracking],
    expenseTracking:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"expenseModels"
    }],
    waterTracking:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"waterModels"
    }],
};

// Create a new mongoose schema
const userSchema = new mongoose.Schema(userSchemaDefinition);

// Use passport-local-mongoose to indicate this is a special authentication model
// plugin() adds plm functionality to our model
// i.e. hashing/salting password, and handling authentication attempts
userSchema.virtual('fullName').get(function (){
    return this.Personals.name.firstName + ' '+this.Personals.name.lastName;
});
userSchema.plugin(plm);
// Using the schema object, make a new mongoose model
module.exports = mongoose.model('users', userSchema);


