const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

const Account = require("../model/accounts");



// route for when user logs out, session is destroyed and user redirected to login
router.get("/logout", function(req, res) {
    req.session.destroy();
    res.render("introduction", {
        title: null,
        layout: "layouts/layout2",
        
      });;
 });

// route for when user views register page
router.get("/register", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
        res.render("register", {
            title: null,
            layout: "layouts/layout2",
            
          });
    }
  });

  


// route for when user submits register details
router.post("/register",function(req, res) {
  req.body.username = req.body.username.toLowerCase();

    // hash the password
    bcrypt.hash(req.body.password, 8, function(err, hash) {
      if (err) throw error;
      // req.body.username = req.body.username.toLowerCase();
      // save account details with hash password in database
      Account({
        username: req.body.username,
        password: hash
      }).save(function(err, doc) {
        // if user already exists, register page is rendered with error message
        if (err) {
          res.render("register", { 
          title: "Personalize Planner",
          error: "Username already exists.",
            layout: "layouts/layout2"});
  
          // if not, user is redirected to index.
        } else {
          // create session using passport js
          req.login(doc._id, function(err) {
            if (err) throw err;
            req.session.user = req.body.username;
            // res.send('user created');
  
            res.redirect("/");
          });
        }
      });
    });
    
  });

  // route for when user views login page
router.get("/login", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("login", {
         title: undefined,
         layout: "layouts/layout2", });
    }
  });

// route for when user submits login details
router.post("/login", function(req, res) {
    // make input not case sensitive
    req.body.username = req.body.username.toLowerCase();
    req.body.password = req.body.password.toLowerCase();
  
    // look up username in database
    Account.find({ username: req.body.username }, function(err, doc) {
      if (err) throw err;
  
      // if nothing is returned, render login page with error message
      if (!doc.length) {
        res.render("login", { 
           
         error:"Username or password is incorrect.",
         title: "Personalize Planner",
         layout: "layouts/layout2",});
      } else {
        // compare password with hashed password
        bcrypt.compare(req.body.password, doc[0].password, function(err, result) {
          if (err) throw err;
  
          //if they match, redirect to index.
          if (result == true) {
            console.log("hash matches");
  
            // create session using passport js
            req.login(doc[0]._id, function(err) {
              if (err) throw err;
              req.session.user = req.body.username;
  
              res.redirect("/");
            });
  
            //if not, redirect back to login.
          } else {
            console.log("hash does not match");
            res.render("login", {
              title: "Personalize Planner",
                message: "Username or password is incorrect.",
              layout: "layouts/layout2",
            });
          }
        });
      }
    });
  });

  
 
module.exports = router;

