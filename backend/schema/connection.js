

/*mysql nodejs implication
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"2001",
    database:"ig_Data"
});

var send_data = async(query)=>{
    connection.connect(()=>{
        console.log(query);
        connection.query(query,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                return result;
            }
            connection.end();
        });
    })
}

module.exports = send_data;*/



//mongo

var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://rupak:'+process.env.password+'@pinkstagram-db.2svpk.mongodb.net/pinkstagram?retryWrites=true&w=majority'/*"mongodb://127.0.0.1:27017/ig_data"*/,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("db connected");
})

