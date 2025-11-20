if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ExpressError= require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  touchAfter: 24 * 3600
});



store.on("error",(err)=>{
  console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret : "mysupersecretcode",
  resave: false,
  saveUninitialized : true,
  cookie:{
    expires: new Date(Date.now() + 7*24*60*60*1000),
    maxAge: 7*24*60*60*1000,
    httpOnly : true,
  },
};


// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());//a middleware that intializes passport.
app.use(passport.session());//the series of requests and responses,each associated with the same user is known as a session.
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//user information stored in the session
passport.deserializeUser(User.deserializeUser());//user information unstored in the session

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async(req,res)=>{
//   let fakeUser = new User({
//     email:"student@gmail.com",
//     username: "delta-student"
//   });

//   let registeredUser = await User.register(fakeUser,"helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



app.all("/{*any}", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"}= err;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
}) ;

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

//express router => are a way to organize your express application such thtat our primary app.js file does not bloated.
//const router = express.Router() [create new router object]

//state 
//stateful protocol => require server to save the status and session information.
//ex - ftp

//stateless protocol => stateless protocol does not require the server to retain the server information ex -http

// hashing function => 
// for every input there is a fixed output
// they are one way functions, we cant get input from output
// for an different input, there is a different output but of same length
// small changes in input should bring large changes in output. 

//Salting
//password salting is a technique to protect passwords stored in databases by adding a string of 32 or more characters and then hashing them.

//passport => it is an library which help on authentication
//npm i passport
//npm i passport-local
//npm i passport-local-mongoose



