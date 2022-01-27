var mongoose = require("mongoose");

var schimg = mongoose.Schema({
    "email":{type:String, required:true},
    "timestamp":{type:Date,default:Date.now()},
    "img_store":{type:String,required:true},
    "description":{type:String},
    "likes":{type:Array,default:[]},
    "comments":{type:Array,default:[]},
    "like_count":{type:Number,default:0},
    "comment_count":{type:Number,default:0}
})

module.exports = mongoose.model("Image_data",schimg);