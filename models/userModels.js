
//just to check
const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

const userSchemaDefinition = {
    username: String,
    password: String
};

const userSchema = new mongoose.Schema(userSchemaDefinition);

// Use passport-local-mongoose to indicate this is a special authentication model
// plugin() adds plm functionality to our model
// i.e. hashing/salting password, and handling authentication attempts
userSchema.plugin(plm);

module.exports = new mongoose.model('users', userSchema);