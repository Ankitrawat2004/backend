const mongoose = require('mongoose');

main().then((res)=>{console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

//In Mongoose schema is defined for  collection and columns are documents
//Models => models in mongoose is a class with which we consturct documents.
const User = mongoose.model("User",userSchema);

// const user1 = new User({
//     name:"Adam",
//     email:"adam@yahoo.in",
//     age:48,
// });
// user1.save();

// const user2=new User({
//     name:"Eve",
//     email:"eve@yahoo.in",
//     age:48,
// });
// user2.save().then(res=>{console.log(res);

// }).catch(err=>{console.log(err);

// });

//Insert Many
// User.insertMany([
//     {name:"Tony",email:"tony@gmail.com",age:40},
//     {name:"Peter",email:"Peter@gmail.com",age:30},
//     {name:"Bruce",email:"bruce@gmail.com",age:50},
// ]).then((res) =>{
//     console.log(res);
// });

//FIND
//Model.find() retuns a Query Object
//Mongoose Queries are not promise .BUt they have  a.then()

User.find({age:{$gt:47}}).
then(res=>{console.log(res);

}).catch((err)=>{
    console.log(err);
});

//Model.findOne(); returns a single result
User.findOne({_id:"6867dacdf55cf967b333d939"}).
then(res=>{console.log(res);

}).catch((err)=>{
    console.log(err);
});
User.findById("6867dacdf55cf967b333d939").
then(res=>{console.log(res);

}).catch((err)=>{
    console.log(err);
});
//UPDATE
//Model.updateOne()
User.updateOne({name:"Bruce"},{age:49}).then((res)=>{
    console.log(res);
});
//Model.updateMany()
User.updateMany({age:{$gt:48}},{age:45}) .then((res)=>{
    console.log(res);
});
//Model.findOneAndUpdate()
User.findOneAndUpdate({name:"Bruce"},{age:35},{new:true}).then((res)=>{
    console.log(res);
});
//Model.FindByIdAndUpdate()

//DELETE
//Model.deleteOne() returns count
User.deleteOne({name:"Adam"}).then((res)=>{
    console.log(res);
});
//Model.delete.Many() returns count
User.deleteMany({age:{$gt:40}}).then((res)=>{
    console.log(res);
});
User.findByIdAndDelete("6867dacdf55cf967b333d939").then((res)=>{
    console.log(res);
});

//schema validations
const bookSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
    },
});