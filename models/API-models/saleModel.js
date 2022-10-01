// Import Mongoose
const mongoose = require("mongoose");

const schemaDef = {
    startDate:{
        type: Date,
        required : true
    },
    endDate:{
        type:Date,
        required: true
    },
    storeID:{
        type:String,
        required:true
    }
}
// Create new Schema using the definition
let schemaObj = new mongoose.Schema(schemaDef);
// Create a model using the schema and export Module
module.exports = mongoose.model('Sale',schemaObj);