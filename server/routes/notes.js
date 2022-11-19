const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");
const Todo = require("../model/todos");
const Note = require("../model/notes");



router.get("/notes", authenticateUser(), function(req, res) {
  Note.find({ username: req.session.user }, function(err, result) {
    if (err) throw err;

    res.render("notes", {
      notes: result,
      username:req.session.user,
      title: "Node JS Todo App",
    layout: "layouts/mainLayout", });
  });
    
   
});

router.post('/notes/add-note', function (req, res) {
  // create todo model with data passed from request and save to databse

  Note({
      note: req.body.note,
      username: req.session.user
  }).save(function (err, doc) {
      if (err) throw err;
      console.log("item saved!");

      // send response back with the document object that was created
      res.send(doc);
  });
});

// // route for when user edits a todo item
router.put('/notes/:id', function (req, res) {
  // update the document in the database has matches the id with updated todo data
  Note.update({ _id: req.params.id }, { note: req.body.note }, function (err, doc) {
      if (err) throw err;
      console.log("item edited!");

      // send response back with the document object that was edited
      res.send(doc);
  });
});



// route for when user deletes a todo item
router.delete('/notes/:id', function (req, res) {
  // remove the document in the database that matches the id.
  Note.find({ _id: req.params.id }).remove(function (err, doc) {
      if (err) throw err;

      // send response back with the document object that was deleted
      res.send(doc);
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

