const mongoose = require("mongoose");

const Account = mongoose.model("Account", {
  username: {
        type: String,
        unique:true,
        required: true,
      },
  password: {
        type: String,
       
      },
  
});

module.exports = Account;
