// Import mongoose
const mongoose = require('mongoose');


// Create schema definition object
const foodSchemaDefinition = {
    name:{
        type:String,
        required :true
        },
    mealTime:{
        type:String,
        enum:['BREAKFAST','LUNCH','DINNER','SNACK'],
        required: true
        },
    mealType:{
        type:String,
        enum: ['HOMEMADE','STORE-BOUGHT','FAST-FOOD']
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
};

// Create a new mongoose schema
const foodScheme = new mongoose.Schema(foodSchemaDefinition);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('foodModels', foodScheme);



