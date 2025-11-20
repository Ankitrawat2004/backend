const { faker } = require('@faker-js/faker');
const mysql= require('mysql2');
const express=require("express");
const app =express();
const path=require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");


app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); // ✅ CORRECT

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database:'delta_app',
    password:'takshr20'
});

let getRandomUser=()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}
//insert new data
// let q ="INSERT INTO user (id,username,email,password) VALUES ?";

// let data=[];
// for(let i =1;i<=100;i++){
//   data.push(getRandomUser());//100fake user data
// }
//let users =[["123B","123_newuserB","abc@gmail.comB","abcB"],
//["123C","123_newuserC","abc@gmail.comC","abcC"],];
// try{
// connection.query(q, [data] ,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
// });
// } catch(err){
//     console.log(err);
// }
// connection.end();
//home route
app.get("/",(req,res)=>{ // fetch and show total no of user on our app
  let q = `SELECT count(*) FROM user`;
  try{
 connection.query(q ,(err,result)=>{
        if(err) throw err;
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count});
 });
 } catch(err){
     console.log(err);
     res.send("some error in database");
 }
});

//show route => fetch & show (userid,username,email)of all suers
app.get("/user",(req,res)=>{
    let q = `SELECT * FROM USER`;
      try{
 connection.query(q ,(err,users)=>{
        if(err) throw err;
        res.render("showusers.ejs",{users});
 });
 } catch(err){
     console.log(err);
     res.send("some error in database");
 }
});

//EDIT ROUTE
app.get("/user/:id/edit",(req,res)=>{
    let {id} =req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
 connection.query(q ,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        res.render("edit.ejs",{user});
 });
 } catch(err){
     console.log(err);
     res.send("some error in database");
 }
    
});

//UPDATE (DB) ROUTE
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;

  let q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    if (result.length === 0) {
      return res.send("User not found");
    }

    let user = result[0];

    if (formPass.trim() !== user.password.trim()) {
  return res.send("WRONG PASSWORD");
}


    let q2 = `UPDATE user SET username = ? WHERE id = ?`;
    connection.query(q2, [newUsername, id], (err, updateResult) => {
      if (err) {
        console.log(err);
        return res.send("Failed to update username");
      }

      res.redirect("/user"); // success
    });
  });
});
// Show form to add new user
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
//Add new user
app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

//delete user
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password.trim() != password.trim()) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});




app.listen("8080",()=>{
  console.log("server is listening to port 8080");
});
