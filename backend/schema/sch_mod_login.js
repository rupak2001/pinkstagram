var mongoose = require('mongoose');

var schema = mongoose.Schema({
    "name":{type:String,required:true,trim:true},
    "email":{type:String,required:true,unique:true},
    "password":{type:String,required:true,minlength:[4,"not valid"]}
});

var login_data = new mongoose.model("login_data",schema);

module.exports = login_data;