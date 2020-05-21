

exports.indexControl = (req , res) => {
    res.render('index')
};


exports.errorControl = (req, res) =>{
    res.render('error',{mesg : "Some ERROR"});
}


