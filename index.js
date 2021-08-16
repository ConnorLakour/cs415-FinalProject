require("./db/mongoose");
const express = require("express");
const Book = require("./models/book");
const User = require("./models/user");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");

const app = express();
app.use(cors());

const port = process.env.PORT || 6600;

app.use(express.json());

app.use(userRouter);

app.use(bookRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const bcrypt = require("bcryptjs");

const myFcn = async () => {
  const pw = "Connor12345";
  const hashedpw = await bcrypt.hash(pw, 8);
  console.log(pw, hashedpw);

  const isMatch = await bcrypt.compare("Connor12345", hashedpw);
  console.log(isMatch);
};

// myFcn()
