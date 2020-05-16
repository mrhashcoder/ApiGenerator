const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    dbname : {
        type : String,
        required : true
    },
    collectionname :{
        type:String,
        required:true
    },
    noOfEnt : {
        type : Number,
        required : true,
    },
    listOfEnt : {
        type : [String],
        required : true
    }
});

module.exports = mongoose.model('collection' , CollectionSchema);