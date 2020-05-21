const Db = require('../Models/db');
const Collection = require('../Models/collection');
const Data = require('../Models/data');

exports.getdb = async(req,res) =>{
    const listOfDb = await Db.find();
    const namesOfDb = new Array();
    for(var i = 0 ; i  < listOfDb.length ; i++){
        namesOfDb.push(listOfDb[i]['dbname']);
    }
    res.render('db/db' , {list : namesOfDb});
}

exports.postCreateDb = async(req,res) => {
    var body = req.body;
    var dbname = body.dbname;
    //console.log(dbname);
    try{
        var findDb = await Db.findOne({dbname : dbname});

        if(findDb){
            console.log('db already available');
            res.redirect('/createdb');
        }else{
            newDb = new Db({
                dbname : dbname,
                dbid : getDbId()
            });
            newDb.save();
            res.redirect('/' + dbname);
        }
        
    }
    catch(err){
        console.log(err);
        res.send("some error");
    }
}

exports.getCreateDb = (req, res) => {
    res.render('db/createDb');
}

exports.getSpecificDb = async(req,res) =>{
    try{
        var dbname = req.params.dbname; 
        var findDb = await Db.findOne({dbname : dbname});
        var listOfCollection = await Collection.find({dbname : dbname});
        var nameOfCollections = new Array()
        for(var i = 0 ; i < listOfCollection.length ; i++){
            nameOfCollections.push(listOfCollection[i]['collectionname']);
        }
        if(findDb){
            res.render('db/specificDb' , {dbname : dbname , list : nameOfCollections});
        }
        else{
            res.render('error' , {mesg : "database not found"});
        }
    }
    catch(err){
        console.log(err);
        res.redirect('/db');
    }
}

exports.getCreateCollecion = (req , res) =>{
    const dbname = req.params.dbname;
    res.render('db/createCollection' , {'dbname' : dbname});
}

exports.postCreateCollection = async(req , res) =>{
    const body = req.body;
    //console.log(body);
    const num = body['numOfEnt']
    const listOFEnt = new Array();

    for(var i = 1 ; i <= num ; i++){
        var Ent = "Ent" + i;
        //console.log(body[Ent]);
        listOFEnt.push(body[Ent]);
    }
    const collectionName = body['collectionname'];
    const dbname = req.params.dbname;
    try{
        const newCollection = new Collection({
            dbname : dbname,
            collectionname : collectionName,
            listOfEnt : listOFEnt,
            noOfEnt : num
        });
        await newCollection.save();
        res.redirect('/' + dbname);
    }catch(err){
        console.log('error');
        res.redirect('/' + dbname);
    }
}

exports.getSpecificCollection = async(req,res) =>{
    try{
        const dbname = req.params.dbname;
        const collectionname = req.params.collectionname;

        var colletionFind = await Collection.findOne({$and : [{dbname : dbname} , {collectionname : collectionname}]});
        //console.log(colletionFind);
        var listOfEnt =  colletionFind['listOfEnt'];
        console.log(listOfEnt);
        var dataOfCollection = await Data.find({$and: [{dbname : dbname} , {collectionname : collectionname}]});
        //console.log(dataOfCollection)
        var renderData = {
            Ents : listOfEnt,
            dataCol : dataOfCollection,
            dbname : dbname,
            collectionname : collectionname
        };

        res.render('db/specificCollection',renderData);
    }catch(err){
        console.log(err);
        res.redirect('/error');
    }
}







function getDbId() {
    return Math.random().toString(36).substr(3, 4);
};