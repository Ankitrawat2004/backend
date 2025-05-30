const express =require("express");
const app = express();
//this app is an object
//console.dir(app);
let port =3000;
//Ports are the logical endpoints of a network connetion is used to excahnge information between a web server and web client.
//app.listen() is a method that starts your server and makes it listen for incoming requests on a specific port.
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});
//stop the port press ctrl+c
//app.use() is used to run some code for every request your server receives.
// app.use((req,res)=>{
//     //console.log(req);
//     console.log("request received");
//     let code="<h1>Fruits</h1> <ul><li>apple</li><li>orange</li></ul>";
//     res.send(code);
//     //res.send() is used to send a response back to the client (like a browser, Postman, or frontend app).

// });

//routing is a process of selecting a path for traffic in a network or between or across multiple netwroks.
//The app.get() method is used to handle HTTP GET requests in Express.
//This is how you define a route that runs code when someone visits a specific URL using GET (like opening a page in a browser).

app.get("/",(req,res)=>{
    res.send("Hello i am root");
});
app.get("/apple",(req,res)=>{
    res.send("you contacted apple path");
});
app.get("/orange",(req,res)=>{
    res.send("you contacted orange path");
});
app.get("*",(req,res)=>{
    res.send("this path does not exist");
});

app.post("/",(req,res)=>{
    res.send("you sent a post request to root");
});