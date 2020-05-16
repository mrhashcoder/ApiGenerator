const Db = require('../Models/db');



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
    console.log(body);    

    try{
        res.redirect('/db');
    }catch(err){
        console.log('error');
        res.redirect('/db');
    }
}








function getDbId() {
    return Math.random().toString(36).substr(3, 4);
};