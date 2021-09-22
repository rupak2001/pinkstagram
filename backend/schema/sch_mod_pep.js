var mongoose = require("mongoose");
var fs = require("fs")

var sch = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    profimg:{type:Buffer,default:fs.readFileSync("./images/Profile-PNG-Icon-715x715.png")},
    followerList:{type:Array,default:[]},
    followingList:{type:Array,default:[]},
    followerCount:{type:Number,default:0},
    followingCount:{type:Number,default:0},
    postCount:{type:Number,default:0}
})


module.exports = new mongoose.model("user_relations",sch);