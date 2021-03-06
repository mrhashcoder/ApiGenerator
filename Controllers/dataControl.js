const Collection = require('../Models/collection');
const Data = require('../Models/data');

exports.getInsertData = async(req,res) => {
    try{
        const dbname = req.params.dbname;
        const collectionname = req.params.collectionname;

        const collectionFind = await Collection.findOne({$and : [{dbname : dbname} , {collectionname : collectionname}]});
        var list = new Array();
        var num = 0;
       // console.log(collectionFind);
        if(collectionFind){
            list = collectionFind['listOfEnt']
            num = collectionFind['noOfEnt'];        
        }
        //console.log(list);
        //console.log(num);
        const data = {
            num : num,
            list : list,
            dbname : dbname,
            collectionname : collectionname
        };
        //res.render('error',{mesg : "load"});
        res.render('data/insertData', data);
    }catch(err){
        console.log(err);
        res.redirect('/error')
    }
}


exports.postInsertData = async(req , res) => {
    const body = req.body;
    try{
        //console.log(body);
        var dbname = req.params.dbname;
        dbname.trim();
        var collectionname = req.params.collectionname;
        collectionname.trim()
        const findCol = await Collection.findOne({collectionname : collectionname});
        //console.log(findCol);
        const list = findCol['listOfEnt'];
        const data = new Array();
        for(var i = 0 ; i < list.length ; i++){
            var k = list[i];
            data.push(body[k]);
        }

        var jsonD = {};
        for(var i = 0 ; i < list.length ; i++){
            jsonD[list[i]] = data[i];
        }
        var jsonStr = JSON.stringify(jsonD);
        //console.log(jsonStr);
        const newData = new Data({
            collectionname : collectionname,
            dbname : dbname,
            jsondata : jsonStr
        });
        await newData.save();
        res.redirect('/'+dbname+'/' + collectionname);
        
    }catch(err){
        console.log(err);
        res.redirect('/error');
    }
}