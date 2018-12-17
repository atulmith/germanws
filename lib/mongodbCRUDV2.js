var mongodbconnect=require('./monogdbconnect');
var ObjectID = require('mongodb').ObjectID;

// Find Records with Query Params
function selectFind(dbname,tablename,searchparam,res){
    
    mongodbconnect.mymongofuncwithdb(dbname,function(err,db){
        console.log("calling " + tablename + " , search params:" + searchparam);
        
        db.collection(tablename).find(searchparam).toArray(function(err, docs) {
            if (err) {
            console.log(res, err.message, "Failed/Error to SelectFind.");
            } else {
                console.log('Result: ',docs);
                
            res.status(200).json(docs);
            // res.send(result[0]);
            }
            db.close();
         });
    }
    );

}

// Create New Record
function create(dbname,tablename,objtosave,res){
    
    var objtosave2=JSON.parse(objtosave);
    delete objtosave2._id;
    delete objtosave2.__KEY__;

    mongodbconnect.mymongofuncwithdb(dbname,function(err,db){
        console.log("calling " + tablename + " , Object Saving:" + objtosave);
        
        db.collection(tablename).insertOne(objtosave2, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Failed to create new."+tablename);
            } else {
            res.status(201).json(doc.ops[0]);
            //res.send(str);
            
            }
            db.close();
        });

      }
    );

}


// Update by ID
function update(dbname,tablename,objtosave,pkid,res){
    
    mongodbconnect.mymongofuncwithdb(dbname,function(err,db){
        console.log("calling " + tablename + " , Object Updating:" + objtosave+" pkid="+pkid);

    var objtosave2=JSON.parse(objtosave);
    delete objtosave2._id;
    delete objtosave2.__KEY__;
        
        db.collection(tablename).update({_id: new ObjectID(pkid)}, { $set: objtosave2}, function(err, doc) {
                if (err) {
                handleError(res, err.message, "Failed to update "+tablename);
                } else {
                objtosave._id = pkid;
                res.status(200).json(objtosave);
                // res.send(objtosave);
            }
            db.close();
        });  

      }
    );

}


//Select By ID
function selectedit(dbname,tablename,pkid,res){
    
    mongodbconnect.mymongofuncwithdb(dbname,function(err,db){
        console.log("calling " + tablename + " , search params pkid:" + pkid);
        
        db.collection(tablename).findOne({ _id: new ObjectID(pkid) }, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get contact");
             } else {
                res.status(200).json(doc);
                // res.send(result[0]);
             }
             db.close();
            });
        });

      }


// Delete Records with Query Params
function deleterow(dbname,tablename,pkid,res){
    
    mongodbconnect.mymongofuncwithdb(dbname,function(err,db){
        console.log("calling " + tablename + " , delete params:" + pkid);
        
        db.collection(tablename).deleteOne({ _id: new ObjectID(pkid) },function(err, docs) {
            if (err) {
            console.log(res, err.message, "Failed/Error to SelectFind.");
            } else {
                console.log('Result: ',docs);
                
            res.status(200).json(docs);
            // res.send(result[0]);
            }
            db.close();
         });
    }
    );

}
    
// Handle Errors
var  handleError=function handleError(res, msg, text){
    console.log("error msg="+msg);
    console.log("error text="+text);
    
}

module.exports={selectFind:selectFind,create:create,update:update,selectedit:selectedit,deleterow:deleterow};