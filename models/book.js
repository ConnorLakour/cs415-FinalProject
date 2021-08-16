const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    requied: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    trim: true
  },
  overdueFee: {
    type: Number,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  publishDate: {
    type: Date,
    required: true,
    trim: true
  }
});

bookSchema.pre("save", async function(next) {
  const book = this;

  console.log("just before saving")

  next()

});

const Book = mongoose.model("bookcollection", bookSchema);

module.exports = Book;
