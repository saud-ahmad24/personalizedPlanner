const mongoose = require("mongoose");

const Note = mongoose.model("Note", {
    note: String,
    username: String
});

module.exports = Note;
