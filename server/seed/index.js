const Book = require("../models/book");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const NUM_OF_BOOKS = 10;

const getTimeElapsed = (start) => {
  return Math.round((Date.now() - start) / 1000);
};

const createFakeBook = () => {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  const author = `${firstName} ${lastName}`;
  const title = faker.commerce.productName();
  const description = faker.lorem.paragraphs(2);
  const numberOfPages = faker.datatype.number({ min: 30, max: 500 });
  const rating = faker.datatype.number({ min: 1, max: 5 });
  const totalRatings = faker.datatype.number({ min: 10, max: 500 });
  const reviews = faker.datatype.number({ min: 1, max: 500 });
  const imageUrl = faker.image.animals(640, 480, true);
  const isfavorite = faker.datatype.boolean();

  const bookData = new Book({
    _id: new mongoose.Types.ObjectId().toHexString(),
    author,
    title,
    description,
    numberOfPages,
    rating,
    totalRatings,
    reviews,
    imageUrl,
    isfavorite,
  });
  return bookData;
};

const getFakeData = () => {
  const books = [];
  for (let i = 0; i < NUM_OF_BOOKS; i++) {
    const book = createFakeBook();
    books.push(book);
  }
  return books;
};

const seedDb = async () => {
  const start = new Date();
  try {
    const books = getFakeData();
    await Book.insertMany(books);
    console.log(`Seeding took ${getTimeElapsed(start)} seconds`);
  } catch (error) {
    console.log(`Seeding failed: ${error.message}`);
  }
};

module.exports = seedDb;
