const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        reuired:true
    },
    to:{
        type:String,
         reuired:true
    },
    msg:{
        type:String,
        maxLength: 50
    },
    created_at:{
        type:Date,
         reuired:true
    }
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;