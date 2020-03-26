const mongoose = require("mongoose")


const testSchema = mongoose.Schema({
    test1:{
        type:String,
        required: true
    },
    test2:{
        type:String,
        required: true
    },
    test3:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Test', testSchema)