const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config({ path: "config.env" });
const passport = require("passport")
const methodOverride = require("method-override");
const connectDB = require("./server/database/database");

const app = express();
const port = process.env.PORT || 8080;

// Set ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);

// Middleware
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


// functions for persistant sessions
passport.serializeUser(function (user_id, done) { done(null, user_id); });
passport.deserializeUser(function (user_id, done) { done(null, user_id); });

// Connect db
connectDB();

// router
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/dashboard'));
app.use('/', require('./server/routes/spaces'));
app.use('/', require('./server/routes/spaces-item-controller'));
app.use('/', require('./server/routes/todos'));
app.use('/', require('./server/routes/events'));









app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`);
});
