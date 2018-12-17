// Mongodb Instance
var MongoClient = require('mongodb').MongoClient;
//Connection String Import
var mongodbconnectionstring=require('./mongodbconnectionstring');
var conn = new mongodbconnectionstring.mongodbconnectionstring();

//mithun made this
var conn2 = new mongodbconnectionstring.mongodbconnectionwithdbnamestring();

//Connection URL 
var dburl=conn.dbURL;  // "mongodb://127.0.0.1:27017/test";

var dburl2=conn2.dbURL;

// Base Connection To Database
function mymongofunc(passfunchere){
 MongoClient.connect(dburl, function(err, db) {
        
    passfunchere(err,db);
        
    console.log("Function Executed");
 });

}

// Base Connection To Database
function mymongofuncwithdb(dbname,passfunchere){
    MongoClient.connect(dburl2+"/"+dbname, function(err, db) {
           
       passfunchere(err,db);
           
       console.log("Function Executed");
    });
   
}

module.exports={mymongofunc:mymongofunc,mymongofuncwithdb:mymongofuncwithdb};