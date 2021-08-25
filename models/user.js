const mongoose = require("mongoose");
// const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },
  //tokens are provided from the server
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});
//methods are accesible on the instances of (userSchema)
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "mysecret");

  user.tokens = user.tokens.concat({token})
  await user.save()

  return token;
};

//static methods are accesible on the model (userSchema)
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//pre-save
//hash the pw before 
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
