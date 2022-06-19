import * as actionTypes from "./names";

export const setAllBooks = (books) => {
  return {
    type: actionTypes.SET_BOOKS,
    books,
  };
};

export const searchBooks = (filter) => {
  return {
    type: actionTypes.SEARCH_BOOKS,
    filter,
  };
};

export const setBookDetails = (bookId) => {
  return {
    type: actionTypes.SET_BOOK_DETAILS,
    bookId,
  };
};

export const createBook = (payload) => {
  return {
    type: actionTypes.CREATE_BOOK,
    payload,
  };
};

export const updateBook = (bookId, payload) => {
  return {
    type: actionTypes.UPDATE_BOOK,
    bookId,
    payload,
  };
};

export const deleteBook = (bookId) => {
  return {
    type: actionTypes.DELETE_BOOK,
    bookId,
  };
};

export const toggleFavorite = (bookId) => {
  return {
    type: actionTypes.TOGGLE_FAVORITE,
    bookId,
  };
};

export const viewFavorites = () => {
  return {
    type: actionTypes.VIEW_FAVORITES,
  };
};
