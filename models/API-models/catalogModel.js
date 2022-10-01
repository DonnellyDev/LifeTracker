// Import Mongoose
const mongoose = require("mongoose");

const schemaDef = {
    catalogName:{
        type: String,
        required : true
    },
    description:{
        type:String,
        required: true
    },
    storeID:{
        type:String,
        required:true
    },
    saleID:{
        type:String
    },
    accessLevel:{
        type:String,
        default: "USER"
    }
}
// Create new Schema using the definition
let schemaObj = new mongoose.Schema(schemaDef);
// Create a model using the schema and export Module
module.exports = mongoose.model('Catalog',schemaObj);