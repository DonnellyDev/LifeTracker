// Import Mongoose
const mongoose = require("mongoose");

const schemaDef = {
    storeName:{
        type: Date,
        required : true
    },
    location:{
        type:String,
        required: true
    }
}
// Create new Schema using the definition
let schemaObj = new mongoose.Schema(schemaDef);
// Create a model using the schema and export Module
module.exports = mongoose.model('Store',schemaObj);