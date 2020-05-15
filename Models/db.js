const mongoose = require('mongoose');
const Schema = mongoose.Schema;

dbSchema = new Schema({
    dbname :{
        type : String,
        required : true
    },
    dbid : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('db' , dbSchema);