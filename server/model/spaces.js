const mongoose = require("mongoose");

const Space = mongoose.model("Space", {
  

  catogary: {
        type: String,
        required: true,
      },
  todo: {
        type: String,
      },
  desc: {
    type: String,
  },
  username:{
    type: String,
  },
});

module.exports = Space;
