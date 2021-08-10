const mongoose = require("mongoose")

const Book = mongoose.model("bookcollection",{
  title:{
    type: String,
    requied: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    trim: true
  },
  overdueFee:{
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
})

module.exports = Book;