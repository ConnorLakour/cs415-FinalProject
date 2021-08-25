const express = require("express");
const bookRouter = new express.Router()
const Book = require("../models/book")

bookRouter.post("/books", (req, res, next) => {
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

bookRouter.get("/books", (req, res, next) => {
  Book.find({})
    .then(books => {
      res.status(200).send(books);
    })
    .catch(e => {
      res.status(500).send();
    });
});

module.exports = bookRouter
