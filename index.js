// import express from "express"
// import path from "path"
// import expressEjsLayouts from "express-ejs-layouts";
// import mongoose from "mongoose";
// import passport from "passport";
// import flash from "connect-flash"
// import session from "express-session";
// import bodyParser from "body-parser";
// import uc from "upper-case"
require('dotenv').config()
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");


const jsonParser = bodyParser.json();
const uc = require("upper-case");
const app = express();

require("./config/passport")(passport);

// const db = require("./config/keys").mongoURI;

const db = process.env.DB_PASSWORD
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//User Images making available for other folder
app.use('/images', express.static('images')); 

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static(path.join(__dirname, "/assets")));

let propics = require('./routes/profilepic');
app.use(propics);

let routes = require("./routes/welcome");
app.use("/", routes);

let routelog = require("./routes/login");
app.use("/login", routelog);

let routereg = require("./routes/register");
app.use("/register", routereg);

let routedash = require("./routes/dashboard");
app.use("/dashboard", routedash);

let routedashdriver = require("./routes/dashboarddriver");
app.use("/dashboarddriver", routedashdriver);

let routeout = require("./routes/logout");
app.use("/logout", routeout);

let routetravel = require("./routes/travelform");
app.use("/travelform", routetravel);

let routeprofile = require("./routes/profile");
app.use("/profile", routeprofile);

let routeprofiledriver = require("./routes/profiledriver");
app.use("/profiledriver", routeprofiledriver);

let routeSearch = require("./routes/search");
app.use("/search", routeSearch);

let routeRequest = require("./routes/request");
app.use("/request", routeRequest);

let driverdetail = require("./routes/driverdetail");
app.use("/driverdetail", driverdetail);

let journey = require("./routes/journey");
app.use("/journey", journey);

let driver = require("./routes/driver");
app.use("/driver", driver);

let detail = require("./routes/detail");
app.use("/detail", detail);


app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
