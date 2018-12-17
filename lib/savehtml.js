var fs = require('fs');
var ejs = require('ejs');


function savemainpagehtml(root,filename,datajson,datagridjson){

    // var root=app.locals.rootfolder;    
    var templatefilename=root+"\\pages\\template\\standalone1.ejs";
    var savefilepath=root+"\\pages\\"+filename;
    var data={mydata:datajson,datagridjson:datagridjson};
    var options=[];
    console.log("templatefilename"+templatefilename);

    return ejs.renderFile(templatefilename, data, options, function(err, str){
        // str => Rendered HTML string 
        fs.writeFileSync(savefilepath,str);
        return savefilepath;
        // return fs.writeFile(savefilepath,str,(err)=>{
        //     if(err) throw err;
        //     console.log("savedfile at"+savefilepath);
        //     return savefilepath;     
        // });
        
    });
}
module.exports={savemainpagehtml:savemainpagehtml};