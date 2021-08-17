const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Pick another password");
      }
    }
  }
});

userSchema.pre("save", async function(next){
  const user = this;

  if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password,8)
  }

})



const User = mongoose.model("user", userSchema)
module.exports = User;
