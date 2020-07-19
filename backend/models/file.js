const { model, Schema,  } = require('mongoose');

// Create a schema
const fileSchema = new Schema({
    username: {
        type: String,
        lowercase: true
    },
    filename: {
        type: String,
    },
    fileID: {
        type: String,
    },
});

// Create a model
const File = model('file', fileSchema);

// Export the model
module.exports = File;