const express = require("express");
const app=express();
const path = require("path");//require path package

const port=8080;

app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/css")));//to serve static file we need public folder
//view engine =>template
app.set("view engine","ejs");

app.set("views",path.join(__dirname, "/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/rolldice",(req,res)=>{
    let diceVal=Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceVal});
});
 app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    const instaData = require("./data.json");
    const data=instaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    }else{
        res.render("error.ejs");
    }
    
 });
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//interpolation syntax=> refers to embedding expressions into marked up text.

//includes are sub templates