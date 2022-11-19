const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");
const Event = require("../model/events");


router.get("/events", authenticateUser(), function(req, res) {
  
    Event.find({username:req.session.user},(err,result)=>{
        if (err) throw error;
        // res.send(result);
        res.render("events", {
            event:result,
            username:req.session.user,
            title: "Personalize Planner",
          layout: "layouts/mainLayout", });
        
    })
    
   
});

router.get("/events/add-event", authenticateUser(), function(req, res) {
    
    res.render("add-event", {
      username:req.session.user,
        title: "Personalize Planner",
    layout: "layouts/mainLayout", });
   
});



router.post('/events/add-event',authenticateUser(),(req,res)=>{
    var date1 = new Date(req.body.date);
    const data = {
        event:req.body.event,
        desc:req.body.desc,
        date:date1,
        username:req.session.user,
    }
    
    Event.insertMany(data, function (err, result) {
      res.redirect('/events');
    });
  })

  router.put("/update-event",  (req,res)=>{
    Event.findByIdAndUpdate(req.body._id, req.body).then((result) => {
      // res.send(result)
      res.redirect('/events');
    });
  });
  router.delete("/event", (req,res)=>{
    Event.findByIdAndDelete(req.body._id).then((result) => {
    res.redirect('/events');
        
      });
  });

  router.get("/events/update-event/:id", async (req,res)=>{
    const event = await Event.findById(req.params.id);
    res.render("update-event", {
      username:req.session.user,
      title: "Edit Todo",
      layout: "layouts/mainLayout",
      event,
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

