const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    dbname :{
        type : String,
        required:true
    },
    collectionname :{
        type : String,
        required:true
    },
    jsonData : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Data' , dataSchema);