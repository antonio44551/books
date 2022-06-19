const Book = require("../models/book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ code: 404, message: "Book not found!" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createBook = async (req, res) => {
  const {
    author,
    title,
    description,
    numberOfPages,
    rating,
    totalRatings,
    reviews,
    imageUrl,
  } = req.body;
  try {
    const newBook = new Book({
      author,
      title,
      description,
      numberOfPages,
      rating,
      totalRatings,
      reviews,
      imageUrl,
    });
    const savedBook = await newBook.save();
    res.status(200).json({
      code: 200,
      message: "Book successfully created!",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ code: 404, message: "Book not found!" });
      return;
    }
    const {
      author,
      title,
      description,
      numberOfPages,
      rating,
      totalRatings,
      reviews,
      imageUrl,
      isFavorite,
    } = req.body;
    const updatedBookData = {
      author,
      title,
      description,
      numberOfPages,
      rating,
      totalRatings,
      reviews,
      imageUrl,
      isFavorite,
    };
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updatedBookData,
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      res.status(404).json({ code: 404, message: "Book not found!" });
    } else {
      res.status(200).json({ code: 200, message: "Book deleted!" });
    }
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteAll = async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ code: 200, message: "Books deleted!" });
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  deleteAll,
};
