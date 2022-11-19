const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
    todo: String,
    check: Boolean,
    username: String
});

module.exports = Todo;
