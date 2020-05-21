const Data = require('../Models/data');
const Collection = require('../Models/collection');
const Db = require('../Models/db');


exports.DbApiControl = async(req,res) => {
    try{
        var allDb = await Db.find();
        console.log('yes');
        res.json(allDb).status(200);
    }catch(err){
        res.json({"mesg" : "DataBase or Internet Error"}).status(400);
    }
}


exports.specificDb = async(req,res) => {
    try{
        var dbname = req.params.dbname;
        var collectionList = await Collection.find({dbname : dbname});
        //console.log(collectionList);
        res.json(collectionList).status(200);
    }catch(err){
        console.log("ERROR");
        res.json({"mesg" : "some error"}).status(400);
    }
}

exports.speecificCollection = async(req,res) => {
    try{
        var dbname = req.params.dbname;
        var collectionname =req.params.collectionname;

        var allData =  await Data.find({$and: [{dbname : dbname} , {collectionname : collectionname}]});
        res.json(allData).status(200);

    }catch(err){
        console.log("Error");
        res.status(400).json({'mesg' : "some internet or database error"});
    }
}


exports.specificDataEntry = async(req,res) => {
    try{
        var dbname = req.params.dbname;
        var collectionname = req.params.collectionname;
        var index = parseInt(req.params.index);

        var allData = await Data.find({$and: [{dbname : dbname} , {collectionname : collectionname}]});
        if(allData.length <= index){
            return res.status(404).json({"mesg":"Index Element Not Found"});
        }
        else{
            var specificdata = allData[index]['jsondata'];
            specificdata = JSON.parse(specificdata);
            var rendObj = {};
            rendObj['dbname'] = dbname;
            rendObj['collectionname'] = collectionname;

            var finalObj =  Object.assign(specificdata , rendObj);
            console.log(finalObj);
            res.json(finalObj);
        }
    }catch(err){
        console.log('ERROR');
        res.status(400).json({"mesg" : "some error"});
    }
}