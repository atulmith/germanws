var express = require('express');
var router = express.Router();

 
router.get('/',function(req,res,next){
    // res.send('This is hte home page');
    console.log(__dirname+"\\..\\home.html");
    var url=req.app.locals.rootfolder+"/pages/home.html";
    res.sendFile(url);
    // res.sendFile("./pages/home.html");
});


module.exports = router;
