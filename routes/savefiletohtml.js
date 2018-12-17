var express = require('express');
var router = express.Router();
var savehtmllogic=require('../lib/savehtml');
var bodyParser=require('body-parser');
var jsonparser=bodyParser.json();
var urlencodedparser=bodyParser.urlencoded({extended:false});


router.get('/savefile',function(req,res,next){
    // res.send('This is hte home page');
    var params = req.query;//body;
    console.log("params=",params);
    var filename=params.filename;
    var datajson=params.datajson;
    var datagridjson=params.datagridjson;

    console.log("params filename="+filename);
    var root=req.app.locals.rootfolder;
    var savefilename=savehtmllogic.savemainpagehtml(root,filename,datajson,datagridjson);
    console.log("savedfilename="+savefilename);
    var url=req.app.locals.rootfolder+"/pages/home.html";
    res.sendFile(savefilename);//url);
    // res.sendFile("./pages/home.html");
});

router.post('/savefile', urlencodedparser, function (req, res) {
    console.log('savefile post');
    console.log(req.body);
    var params = req.body;
    var filename=params.filename;
    var datajson=params.datajson;
    var datagridjson=params.datagridjson;
    if(!datagridjson){
        datagridjson=[];
    }
    console.log("params filename="+filename);
    var root=req.app.locals.rootfolder;
    var savefilename=savehtmllogic.savemainpagehtml(root,filename,datajson,datagridjson);
    console.log("savedfilename="+savefilename);
    
    res.sendFile(savefilename);//url);


});

module.exports = router;
