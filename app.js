var express=require('express');
var bodyParser=require('body-parser');

var cors = require('cors');

var fs=require('fs');
var index=require('./routes/index');

var webpageslogic=require('./routes/webpageslogic');
var savefiletohtml=require('./routes/savefiletohtml');
var gridpageslogic=require('./routes/gridpageslogic');

var app=express();




/**
 * Below to allow urlencodedparser
 */
var jsonparser=bodyParser.json();
var urlencodedparser=bodyParser.urlencoded({extended:false});



app.use(urlencodedparser);
app.use(jsonparser);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', cors()); 


/**
 * Below method makes the stuff folder exposed to the browser 
 */
app.use('/pages',express.static('./pages'));
app.locals.rootfolder=__dirname;
app.use('/', index);
app.use('/webpageslogic',webpageslogic); 
app.use('/savefiletohtml',savefiletohtml); 
app.use('/gridpageslogic',gridpageslogic); 



// app.listen(3005);
var server=app.listen(8080);
console.log("Listening on port 8080");

