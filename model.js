const mongoose =  require('mongoose');
const Schema = mongoose.Schema();

const directorySchema  = new Schema({
    FirstName: {
        type: String,
        required:  true
    },
    LastName: {
        type: String,
        required:  true
    },
    PhoneNumber: {
        type: String,
        required:  true
    }
});

const model = mongoose.model("Directory", directorySchema);

module.exports = model;