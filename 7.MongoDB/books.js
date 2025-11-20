const mongoose = require('mongoose');

main().then((res)=>{console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        min:[200,"price is too low fro amazon selling"],
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"],
    },
    genre:[String],
});

const Book = mongoose.model("Book",bookSchema);

// let book1 = new Book({
//     title:"Marvel Comics v2",
//     author:"RD SHARMA",
//     price:1200,
//     genre:["comics","superheroes","fiction"]
// });

// book1.save().then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

//Schema Type Options
//enum:[] it means values should be in this array other wise error
//genre:[String] in which we can store strings in array 


//Schema validations with UPDATE
Book.findByIdAndUpdate("6867f32610db1455ab5531f8",{price:-500},{runValidators:true}).
then((res)=>{console.log(res);
    
})
.catch((err)=>
{
    console.log(err.errors.price.properties);
});