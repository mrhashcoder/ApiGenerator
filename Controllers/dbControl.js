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
            res.redirect('/db')
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









function getDbId() {
    return Math.random().toString(36).substr(3, 4);
};