var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var mysqlutil=require('../mysqlutil');

// var jsonparser=bodyParser.json();
var urlencodedparser=bodyParser.urlencoded({extended:false});
var conmysql;


router.get('/', function (req, res, next) {
    // res.send('This is hte home page');
    res.sendFile(__dirname + "/home.html");
});


router.post('/WS_CountryMaster_create', urlencodedparser, function (req, res) {
    console.log('WS_CountryMaster_create');
    console.log(req.body);
    var params = req.body;
    var conmysql=req.app.locals.conmysql;

    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [params.input0];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_create', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });
});
router.post('/WS_CountryMaster_update', urlencodedparser, function (req, res) {
    console.log('WS_CountryMaster_update');
    console.log(req.body);
    var params = req.body;
    var conmysql=req.app.locals.conmysql;

    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [params.input0];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_update', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });
});
router.post('/WS_CountryMaster_selectjson', urlencodedparser, function (req, res) {
    console.log('WS_CountryMaster_selectjson');
    console.log(req.body);
    var params = req.body;

    var conmysql=req.app.locals.conmysql;

    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_selectjson', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });
});
router.post('/WS_CountryMaster_selectedit', urlencodedparser, function (req, res) {
    console.log('WS_CountryMaster_selectedit');
    console.log(req.body);
    var params = req.body;
    var conmysql=req.app.locals.conmysql;
    
    var outparamarr = ['result', 'outparam'];
    var inparamsarr = [params.input0];
    var outparamname = ["result", "outparam"];
    var result2 = mysqlutil.callmysqlproc('proc_CountryMaster_selectedit', outparamarr, inparamsarr, outparamname, conmysql, function (result) {
        res.send(result[0]);
    });
});





module.exports = router;
