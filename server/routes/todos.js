const express = require("express");
const router = express.Router();

const Account = require("../model/accounts");
const Space = require("../model/spaces");
const Todo = require("../model/todos");


router.get("/todos", authenticateUser(), function(req, res) {
  Todo.find({ username: req.session.user }, function(err, result) {
    if (err) throw err;

    res.render("todos", {
      todos: result,
      username:req.session.user,
      title: "Personalize Planner",
    layout: "layouts/mainLayout", });
  });
    
   
});

router.post('/todos/add-todo', function (req, res) {
  // create todo model with data passed from request and save to databse

  Todo({
      todo: req.body.todo,
      check: req.body.check,
      username: req.session.user
  }).save(function (err, doc) {
      if (err) throw err;
      console.log("item saved!");

      // send response back with the document object that was created
      res.send(doc);
  });
});

// route for when user edits a todo item
router.put('/todos/:id', function (req, res) {
  // update the document in the database has matches the id with updated todo data
  Todo.update({ _id: req.params.id }, { todo: req.body.todo }, function (err, doc) {
      if (err) throw err;
      console.log("item edited!");

      // send response back with the document object that was edited
      res.send(doc);
  });
});

// route for when user edits a checkbox
router.put('/todos/check/:id', function (req, res) {
  // update the document in the database has matches the id with updated checkbox data
  Todo.update({ _id: req.params.id }, { check: req.body.check }, function (err, doc) {
      if (err) throw err;
      console.log("checkbox edited!");

      // send response back with the document object that was edited
      res.send(doc);
  });
});

// route for when user deletes a todo item
router.delete('/todos/:id', function (req, res) {
  // remove the document in the database that matches the id.
  Todo.find({ _id: req.params.id }).remove(function (err, doc) {
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

