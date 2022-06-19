const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  totalRatings: {
    type: Number,
    default: 0,
    required: true,
  },
  reviews: {
    type: Number,
    default: 0,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
