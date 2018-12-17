var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
// var mysqlutil=require('../mysqlutil');
var MongoClient = require('mongodb').MongoClient;
var jsonparser=bodyParser.json();
var urlencodedparser=bodyParser.urlencoded({extended:false});
var conmysql;


router.get('/', function (req, res, next) {
    // res.send('This is hte home page');
    res.sendFile(__dirname + "/home.html");
});


router.post('/WS_create', urlencodedparser, function (req, res) {
    console.log('WS_create');
    console.log(req.body);
    var params = req.body;
    var url=req.app.locals.dburl;
    var tablename=params.tablename;
    var objtosave=params.objtosave;



    MongoClient.connect(url, function(err, db) {
        
        db.collection(tablename).insertOne(objtosave, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Failed to create new."+tablename);
            } else {
            res.status(201).json(doc.ops[0]);
            //res.send(str);
            
            }
            db.close();
        });
            
        });


    // var outparamarr = ['result', 'outparam'];
    // var inparamsarr = [params.input0];
    // var outparamname = ["result", "outparam"];
    // var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_create', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
    //     res.send(result[0]);
    // });
});
router.post('/WS_update', urlencodedparser, function (req, res) {
    console.log('WS_update');
    console.log(req.body);
    var params = req.body;
    var tablename=params.tablename;
    var objtosave=params.objtosave;
    var pkid=params.pkid;
      delete objtosave._id;

    MongoClient.connect(url, function(err, db) {

            db.collection(tablename).updateOne({_id: new ObjectID(pkid)}, objtosave, function(err, doc) {
                if (err) {
                handleError(res, err.message, "Failed to update "+tablename);
                } else {
                objtosave._id = pkid;
                res.status(200).json(objtosave);
                // res.send(objtosave);
            }
            db.close();
            });            
        });


/*    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [params.input0];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_update', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });*/
});
router.post('/WS_selectjson', urlencodedparser, function (req, res) {
    console.log('WS_selectjson');
    console.log(req.body);
    var params = req.body;

    var url=req.app.locals.dburl;
    var tablename=params.tablename;
    // var objtosave=params.objtosave;

    MongoClient.connect(url, function(err, db) {
        
        db.collection(tablename).find({}).toArray(function(err, docs) {
            if (err) {
            handleError(res, err.message, "Failed to get all.");
            } else {
            res.status(200).json(docs);
            // res.send(result[0]);
            }
            db.close();
         });
        });

/*    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_selectjson', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });*/
});
router.post('/WS_selectedit', urlencodedparser, function (req, res) {
    console.log('WS_selectedit');
    console.log(req.body);
    var params = req.body;
    var tablename=params.tablename;
    var pkid=params.pkid;

     MongoClient.connect(url, function(err, db) {
        
      db.collection(tablename).findOne({ _id: new ObjectID(pkid) }, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get contact");
             } else {
                res.status(200).json(doc);
                // res.send(result[0]);
             }
             doc.close();
            });
        });


/*    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [params.input0];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_selectedit', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });*/
});





module.exports = router;
