require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

const port = process.env.PORT || 6600;

app.use(express.json());

//For maintaninace
// app.use((req, res, next) => {
//     res.status(503).send("Currently unavialable");
// });

app.use(userRouter);

app.use(bookRouter);


app.listen(port, () => {
  console.log("Server is running on port " + port);
});

//json web token
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "secretsentencehere", {
    expiresIn: "7 days"
  });
  console.log(token);

  //returns payload if okay otherwise error
  const data = jwt.verify(token, "secretsentencehere");
  console.log(data);
};
// myFunction();

//hash the plain text pw
// const bcrypt = require("bcryptjs");
// const myFcn = async () => {
//   const pw = "Connor12345";
//   const hashedpw = await bcrypt.hash(pw, 8);
//   console.log(pw, hashedpw);

//   const isMatch = await bcrypt.compare("Connor12345", hashedpw);
//   console.log(isMatch);
// };

// myFcn()
