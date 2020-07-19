const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const formdataSchema = new Schema({
  local: {
    // list of users that can edit the form
    owner_username: {
        type: String,
        lowercase: true
    },
    shared_to: {
        type: Array,
    },

    // student's information
    student_name: {
        type: String,
    },
    student_age: {
        type: Number,
    },
    student_school: {
        type: String,
    },

    // form data and last updated date
    last_updated_date: {
        type: Date,
    },
    newTabIndex: {
        type: Number,
    },
    activeKey: {
        type: String,
    },
    formdata: {
        type: String
    }
  },
});

// Create a model
const FormData = mongoose.model('formdata', formdataSchema);

// Export the model
module.exports = FormData;