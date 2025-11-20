const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//passportLocalMongoose => automatically created username , password(hashing & salting) in the schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

//User.plugin(passportLocalMongoose);
userSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User",userSchema);