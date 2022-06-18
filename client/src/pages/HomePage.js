import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../api/index";

import BookCard from "../components/BookCard";

import { setAllBooks, searchBooks } from "../store/actions/index";

function HomePage(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.filteredBooks);

  const getBooks = useCallback(() => {
    getAllBooks()
      .then((response) => {
        console.log("getAllBooks", response.data);
        dispatch(setAllBooks(response.data));
      })
      .catch((error) => console.error("An error occurred!", error));
  }, [dispatch]);

  const searchHandler = (event) => {
    const searchTerm = event.target.value;
    console.log("searchTerm", searchTerm);
    dispatch(searchBooks(searchTerm));
  };

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
      <div>
        <input type="text" min="1" max="100" onChange={searchHandler} />
      </div>
      <div>
        {books.map((b) => (
          <BookCard book={b} key={b._id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
