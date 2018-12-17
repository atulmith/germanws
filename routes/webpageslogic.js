var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var mongodbCRUD=require('../lib/mongodbCRUD');

var jsonparser=bodyParser.json();
var urlencodedparser=bodyParser.urlencoded({extended:false});
var conmysql;

// For Default Page 
router.get('/', function (req, res, next) {
    
    var url=req.app.locals.rootfolder+"/pages/home.html";
    
    res.sendFile(url);
});

// Grid Create WS
router.post('/genericcreate', urlencodedparser, function (req, res) {
    console.log('Generic Create Function calling');
    console.log(req.body);
    var params = req.body;
    mongodbCRUD.create("tutorialspoint",params.input0,res);

    console.log("printing result generic select: " );


});

// Grid Select All WS
router.post('/genericselect', urlencodedparser, function (req, res) {
    console.log('Generic Select Function calling');
    mongodbCRUD.selectFind("tutorialspoint",{},res);

    console.log("printing result generic select: " );


});


// Grid Select Single Record Using ID(PK) WS
router.post('/genericselectedit', urlencodedparser, function (req, res) {
    console.log('Generic SelectEdit Function calling');
    
    console.log(req.body);
    var params = req.body;
    mongodbCRUD.selectedit("tutorialspoint",params.input01,res);

    console.log("printing result generic select: " );


});

// Grid Update WS
router.post('/genericupdate', urlencodedparser, function (req, res) {
    console.log('Generic Update Function calling');
    
    console.log(req.body);
    var params = req.body;
    mongodbCRUD.update("tutorialspoint",params.input01,params.input02,res);

    console.log("printing result generic select: " );


});

// Grid Delete Single Record Using ID(PK) WS
router.post('/genericdelete', urlencodedparser, function (req, res) {
    console.log('Generic Generic Delete Function calling');
    
    console.log(req.body);
    var params = req.body;
    mongodbCRUD.deleterow("tutorialspoint",params.input01,res);

    console.log("printing result generic select: " );


});


//For handing error
var  handleError=function handleError(res, msg, text){
    console.log("error msg="+msg);
    console.log("error text="+text);
    
}

module.exports = router;
