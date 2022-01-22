const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true
    }
});

const model = mongoose.model("clients", clientSchema);
module.exports = model;