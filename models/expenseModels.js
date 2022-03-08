// Import mongoose
const mongoose = require('mongoose');


// Create schema definition object
const expenseSchemaDefiniton = {
    date:{
        type:Date,
        required:true
    },
    account:{
        type:String,
        required :true
    },

    description: {
        type: String,
        required: true
    },
    amount:{
      type: Number,
      required: true
    },
    note: {
      type: String,
      required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
};

// Create a new mongoose schema
const expenseSchema = new mongoose.Schema(expenseSchemaDefiniton);

// Using the schema object, make a new mongoose model
module.exports = new mongoose.model('expenseModels', expenseSchema);


