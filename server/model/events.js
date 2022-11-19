const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
  event: {
    type: String,
    required: true,
      },
    desc: {
    type: String,
        
      },
  date: {
     type:Date,
       
      },
    username:{
        type: String,
      },
  
});

module.exports = Event;
