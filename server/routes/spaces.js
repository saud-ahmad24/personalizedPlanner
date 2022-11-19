const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");


router.get("/spaces", authenticateUser(), function(req, res) {
    Space.aggregate([{
        $match: {
          username: req.session.user
       }
      }, {
         $group: {
          _id: "$catogary"
          
        }
      }],(err,result)=>{
        // res.send(result)
        res.render("spaces", {
          space:result, 
          username: req.session.user,
           title: "Personalize Planner",
       layout: "layouts/mainLayout", });
      })
  
  });

  router.get("/spaces/add-spaces", authenticateUser(), function(req, res) {
  
    res.render("add-spaces", {
      username:req.session.user,
        title: "Personalize Planner",
    layout: "layouts/mainLayout", });
   
});


router.post("/add-spaces", authenticateUser(),(req,res)=>{
   
    var data1={
      catogary:req.body.spaces,
      todo:null,
      desc:null,
      username:req.session.user,
     };
     const sp=  req.body.spaces.toLowerCase();
     Space.find({$and:[
      {
        "username":req.session.user
      },
      {
        "catogary":sp
      }
    ]},(err,data)=>{
      if (err) throw err;
      if(!data.length){
        Space.insertMany(data1, function (err, result) {
          res.redirect("/spaces");
        });
      }else{
         res.render("add-spaces", {
          error:"Catogary already exist",
           title: "Personalize Planner",
       layout: "layouts/mainLayout", });
      }
     })
     
    
  });

  router.get("/spaces/manage-spaces", authenticateUser(), function(req, res) {
  
    Space.aggregate([{
      $match: {
        username: req.session.user
     }
    }, {
       $group: {
        _id: "$catogary"
        
      }
    }],(err,result)=>{
      // res.send(result)
      res.render("manage-spaces", {
        space:result, 
        username: req.session.user,
         title: "Personalize Planner",
     layout: "layouts/mainLayout", });
    })


});

router.delete("/spaces", (req,res)=>{
  Space.deleteMany( {$and:[
    {
      "username":req.session.user
    },
    {
      "catogary":req.body._id
    }
  ]} ).then((result) => {
  res.redirect('/spaces/manage-spaces');
      
    });
});

  // middleware which checks if user is authenticated when visiting a specific route
  function authenticateUser() {
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        console.log("authentication = " + req.isAuthenticated());
        return next();
      }
      res.redirect('/');
    };
  }



module.exports = router;

