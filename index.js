require("./db/mongoose");
const express = require("express");
const Book = require("./models/book");
const cors = require("cors")
const app = express();
app.use(cors())

const port = process.env.PORT || 6600;

app.use(express.json());

//add a book
app.post("/books", (req, res, next) => {
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
