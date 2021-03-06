//Getting library Vars
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

//statating app
app = express();
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Static Global Variables ::
dotenv.config();
const PORT = process.env.PORT
const mongoURI = process.env.mongoURI;

//Importing routes
const apiRouter = require('./Routes/ApiRoute');
const indexRouter = require('./Routes/indexRoute');
const dbRouter =  require('./Routes/dbRoute');
const dataRouter = require('./Routes/dataRoute');

//Using Routes

app.use(apiRouter);
app.use(indexRouter);
app.use(dataRouter);
app.use(dbRouter);

mongoose.connect(mongoURI , {
    useCreateIndex: true,
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log('dataBase connected!!');
})
    .catch(err =>{console.log(err)});


console.log("hello");
var server = app.listen(PORT, () =>{
    console.log('server started at ' + PORT);
})