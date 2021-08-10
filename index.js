require("./db/mongoose");
const express = require("express");
const Book = require("./models/book");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//add a book
app.post("/books", (req, res, next) => {
  console.log(req.body);
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).send(book);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//get all books
app.get("/books", (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.status(200).send(books);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
