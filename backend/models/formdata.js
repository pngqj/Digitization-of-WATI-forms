const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        lowercase: true
    },
    student_age: {
        type: Number,
    },
    student_school: {
        type: String,
        lowercase: true
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

// formdataSchema.pre('save', async function (next) {
//   try {
//     console.log('entered');
//     if (!this.methods.includes('local')) {
//       next();
//     }
//     //the formdata schema is instantiated
//     const formdata = this;
//     //check if the formdata has been modified to know if the password has already been hashed
//     if (!formdata.isModified('local.password')) {
//       next();
//     }
//     // Generate a salt
//     const salt = await bcrypt.genSalt(10);
//     // Generate a password hash (salt + hash)
//     const passwordHash = await bcrypt.hash(this.local.password, salt);
//     // Re-assign hashed version over original, plain text password
//     this.local.password = passwordHash;
//     console.log('exited');
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Create a model
const FormData = mongoose.model('formdata', formdataSchema);

// Export the model
module.exports = FormData;