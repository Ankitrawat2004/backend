const express =require("express");
const app = express();
let port=8080;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);

});
// app.get("/",(req,res)=>{
//     res.send("hello , i am root");
// });
// app.get("/:username/:id",(req,res)=>{
//     let {username,id}=req.params;
//     //req.params is an object in Express that contains URL path parameters — the dynamic parts of the URL you define with a colon : in your route.
//     let htmlStr = `<h1>welcome to the page of @${username}</h1>`
//     res.send(htmlStr);
// });
//query string
app.get("/search",(req,res)=>{
    let {q}= req.query;
    if(!q){
        res.send("<h1>nothing searched</h1>")
    }
    res.send(`<h1>search results for query :${q}</h1>`);
});