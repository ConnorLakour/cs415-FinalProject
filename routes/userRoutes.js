const express = require("express");
const userRouter = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");


//user created
userRouter.post("/user", async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//logging in
userRouter.post("/user/:login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//get user w/ id
userRouter.get("/user/:id", auth  , async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.get("/user/me", auth, async (req,res)=>{
res.send(req.user)
})
//create endpoint for getting all users

// const users = await User.find({});

//Update  user
// app.patch("/user:/id", async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//   } catch (e) {}
// });

module.exports = userRouter;
