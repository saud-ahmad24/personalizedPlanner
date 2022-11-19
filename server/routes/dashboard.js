const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");

router.get("/", authenticateUser(), function(req, res) {
    Account.find({username:req.session.user},(err,result)=>{
        if(err) throw err;
        res.redirect('/todos')
       

    })
    
  });
  // middleware which checks if user is authenticated when visiting a specific route
  function authenticateUser() {
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        console.log("authentication = " + req.isAuthenticated());
        return next();
      }
      res.render("introduction", {
        title: null,
        layout: "layouts/layout2",
        
      });;
    };
  }



module.exports = router;

