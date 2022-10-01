// Import Mongoose
const mongoose = require('mongoose');
// Create Schema Definition Object using mapping notation
const schemaDefinition ={
    productName:{
        type: String,
        required : true
    },
    description:{
        type:String,
    },
    currentPrice:{
        type:Number,
        required: true
    },
    purchaseDate:{
        type:Date,
    },
    storeName:{
        type:String,
    },
    saleDate:{
        type:Date
    },
    lastSalePrice:{
        type: Number
    }
}
// Create new Schema using the definition
let schemaObj = new mongoose.Schema(schemaDefinition);
// Create a model using the schema and export Module
module.exports = mongoose.model('Product',schemaObj);