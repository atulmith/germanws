var mysql=require('mysql');

var counter=function(arr){
    return "Len of array is="+arr.length;
}
var adder=function(a,b){
    return `sum is = ${a+b}`;
}
var pi=3.14;
var conmysql;

/*// loadmysql();

function loadmysql(){
if(conmysql){

}
else{
    conmysql=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'pass',
        database:'admin_hms',
        multipleStatements: true
    });

    conmysql.connect(function(err){
        if(err)
        {
            console.log("Error connecting");
        }
        else{
            console.log("MYSQL connected");
        }

    });
}
}*/

var callmysqlproc=function(procname,outparamarr,inparamsarr,outparamname,mysqlcon,myfunc){
//    conmysql.query('SET @outparam=""; CALL proc_member_login("'+username+'", "'+password+'",@outparam); SELECT @outparam as outparam2',
    var sqlstr="";
    var first="";
    var second="";
    var third="";
    var resultarr=[];

    //mysqlcon=conmysql;

    for(k=0;k<inparamsarr.length;k++){
        
        var b=" '"+inparamsarr[k]+"' ";
        if(k!=inparamsarr.length-1){
            b+=", ";
        }
        third+=b;
    }

    for(i=0;i<outparamarr.length;i++){
          var a=" SET @"+outparamarr[i]+"=''; ";

          if(inparamsarr.length>0 || i>0){
            second+=", ";
          }
          first+=a;
          second+="@"+outparamarr[i]+" ";
    }


    sqlstr=first+" CALL "+procname+"("+third+" "+second+"); ";
    if(Array.isArray(outparamname)){
        for(h=0;h<outparamname.length;h++){
            var outparamnames="outparam"+h;
            sqlstr+=" select @"+outparamname[h]+" as "+outparamnames+";";    
            resultarr.push(outparamnames);
        }
    }
    else if(outparamname!=null && outparamname.length>0){
        sqlstr+=" select @"+outparamname+" as outparam2";
    }
    console.log("QUERY STRING="+sqlstr);
        mysqlcon.query(sqlstr,
    // conmysql.query('SET @result=""; SET @outparam=""; CALL proc_tbl_currency_master_drpjson(@result,@outparam); SELECT @outparam;',
        function(err,rows){
                if(err){
                    console.error("mith error"+err);
                    throw err;
                }
                console.log('Data received from mysql proc');
                console.log('whole row=='+JSON.stringify(rows));
                console.log("resultarr=="+resultarr[0]);
                var myresult=[];//rows[rows.length-1];
                
                var len=resultarr.length;
                for(i=len;i>0;i--){
                    myresult.push(rows[rows.length-i]);
                }
                console.log("myresult=="+JSON.stringify(myresult));
                //done comment as on 15 mar 2017 change logic to retrieve more than one result from proc.    
                // var resultingjson=myresult[0].outparam2;
                var resultingjson=[];
                if(resultarr){

                    if(resultarr.length>0){
                            var temp2=myresult[0];
                            console.log("=======temp2======");
                            console.log("temp2="+JSON.stringify(temp2));   
                            console.log("=====end==temp2======");
                            
                        // var temp=myresult[h][resultarr[h]];
                        var temp=temp2[0][resultarr[0]];
                        console.log("=======temp======");
                        console.log("temp="+JSON.stringify(temp));   
                        console.log("=====end==temp======");
                        resultingjson.push(temp);    
                    }
                    if(resultarr.length>1){
                            var temp2=myresult[1];
                        // var temp=myresult[h][resultarr[h]];
                        var temp=temp2[0][resultarr[1]];
                        resultingjson.push(temp);    
                    }
                    
                        // // var temp=myresult[0].outparam0;//resultarr[0];
                        // var temp2=myresult[h];
                        // // var temp=myresult[h][resultarr[h]];
                        // var temp=temp2[resultarr[h]];
                        // resultingjson.push(temp);
                    
                }
                console.log("RESULTINGJSON=="+resultingjson);
                // res.send("COO DONE"+resultingjson);
                // res.send(resultingjson);
                // return resultingjson;
                myfunc(resultingjson);
    });



}

module.exports={counter:counter,adder:adder,pi:pi,callmysqlproc:callmysqlproc};