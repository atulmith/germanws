

function mongodbconnectionstring(){
this.dbURL = 'mongodb://127.0.0.1:27017/test';



}

function mongodbconnectionwithdbnamestring(){
    // this.dbURL = 'mongodb://127.0.0.1:27017/test';
    this.dbURL = 'mongodb://127.0.0.1:27017';
    
    
}
    


module.exports = {mongodbconnectionstring:mongodbconnectionstring,mongodbconnectionwithdbnamestring:mongodbconnectionwithdbnamestring};