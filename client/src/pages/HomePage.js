import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook, updateBook } from "../api/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlusCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import BookCard from "../components/BookCard";

import {
  setAllBooks,
  searchBooks,
  deleteBook as removeBook,
  updateBook as editBook,
  viewFavorites,
} from "../store/actions/index";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const deleteHandler = (bookId) => {
    deleteBook(bookId)
      .then((response) => {
        console.log("deleteBook", response.data);
        dispatch(removeBook(bookId));
      })
      .catch((error) => console.error("An error occurred!", error));
  };

  const toggleFavoriteHandler = (book) => {
    const updatedBook = { ...book, isFavorite: !book.isFavorite };
    updateBook(book._id, updatedBook)
      .then((response) => {
        console.log("toggleFavoriteHandler", response.data);
        dispatch(editBook(book._id, response.data));
      })
      .catch((error) => console.error("An error occurred!", error));
  };

  const newBookHandler = () => {
    navigate("/book-create");
  };

  const updateHandler = (bookId) => {
    navigate(`/book-edit/${bookId}`);
  };

  const bookDetailsHandler = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const toggleViewFavorites = () => {
    dispatch(viewFavorites());
  };

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <>
      <div className="search-create-row">
        <div>
          <button className="books-button" onClick={newBookHandler}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>New book</span>
          </button>
        </div>
        <div className="search-create-row-right">
          <button className="books-button" onClick={toggleViewFavorites}>
            <FontAwesomeIcon icon={faStar} />
            <span>View favorites</span>
          </button>
          <div className="search-wrapper">
            <input
              type="text"
              min="1"
              max="100"
              onChange={searchHandler}
              title="searchCountry"
              aria-label="searchCountry"
              name="searchCountry"
              placeholder="Search for a book..."
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>

      <div className="books-wrapper">
        {books.map((b) => (
          <BookCard
            book={b}
            key={b._id}
            deleteHandler={() => deleteHandler(b._id)}
            updateHandler={() => updateHandler(b._id)}
            toggleFavoriteHandler={() => toggleFavoriteHandler(b)}
            clickHandler={() => bookDetailsHandler(b._id)}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;
