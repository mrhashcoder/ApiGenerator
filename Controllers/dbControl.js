const Db = require('../Models/db');
const Collection = require('../Models/collection');


exports.getdb = (req,res) =>{
    res.render('db/db')
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
        if(findDb){
            res.render('db/specificDb' , {dbname : dbname});
        }
        else{
            res.rendeR('error' , {mesg : "database not found"});
        }
    }
    catch(err){
        console.log("errror");
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
    console.log(num);
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








function getDbId() {
    return Math.random().toString(36).substr(3, 4);
};