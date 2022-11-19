const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");

router.get("/spaces/:spacename", authenticateUser(), async(req,res)=>{
    const  catogary= req.params.spacename;
    const space = await Space.aggregate([{
        $match: {
          username: req.session.user
       }
      }, {
         $group: {
          _id: "$catogary"
          
        }
      }]);
      Space.find({$and:[
      {
        "username":req.session.user
      },
      {
        "catogary":req.params.spacename
      }
    ]}, (err,result)=>{
        res.render("view-spaces-items", {
          catogary,
            space,
            spaceitem:result,
            username: req.session.user,
            title: "Personalize Planner",
         layout: "layouts/mainLayout", });
      } );

  })

  router.get("/spaces/:spacename/add-task", authenticateUser(),(req,res)=>{
    const  catogary= req.params.spacename
    Space.find({ catogary }, function(err, result) {
      if (err) throw err;
     
      res.render("add-task", {
        username:req.session.user,
        catogary,
           title: "Personalize Planner",
      layout: "layouts/mainLayout", });
    });
  })

  router.post('/:spacename/add-task',authenticateUser(),(req,res)=>{
    const data={
      username:req.session.user,
      catogary:req.params.spacename,
      desc:req.body.desc,
      todo:req.body.todo,
    }
    
    Space.insertMany(data, function (err, result) {
      res.redirect(`/spaces/${data.catogary}`);
    });
  })

  router.get("/spaces/update-task/:id", async (req,res)=>{
  const spaceitem = await Space.findById(req.params.id);
  res.render("update-task", {
    title: "Edit Todo",
    layout: "layouts/mainLayout",
    spaceitem,
  });
});

router.put("/spaces-item",  (req,res)=>{
  Space.findByIdAndUpdate(req.body._id, req.body).then((result) => {
    // res.send(result)
    res.redirect(`/spaces/${result.catogary}`);
  });
});
router.delete("/spaces-item", (req,res)=>{
  Space.findByIdAndDelete(req.body._id).then((result) => {
  res.redirect(`/spaces/${result.catogary}`);
      
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

