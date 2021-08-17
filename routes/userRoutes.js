const express = require("express");
const userRouter = new express.Router();
const User = require("../models/user");
//user logins
userRouter.post("/user", (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch(e => console.log(e));
});

//get user w/ id
userRouter.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Update  user
// app.patch("/user:/id", async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//   } catch (e) {}
// });

module.exports = userRouter;
