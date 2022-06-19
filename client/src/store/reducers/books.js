import {
  SET_BOOKS,
  SEARCH_BOOKS,
  DELETE_BOOK,
  SET_BOOK_DETAILS,
  UPDATE_BOOK,
  CREATE_BOOK,
  VIEW_FAVORITES,
} from "../actions/names";

const setBooks = (books) => {
  return { allBooks: books, filteredBooks: books, bookDetails: null };
};

const setBookDetails = (state, bookId) => {
  const targetBook = state.allBooks.find((b) => b._id === bookId);
  if (!targetBook) {
    return { ...state };
  }
  return { ...state, bookDetails: targetBook };
};

const deleteBook = (state, bookId) => {
  const existingBooks = state.allBooks.filter((b) => b._id !== bookId);
  return { ...state, filteredBooks: existingBooks, allBooks: existingBooks };
};

const createBook = (state, newBook) => {
  const { filteredBooks, allBooks } = state;
  return {
    ...state,
    filteredBooks: [...filteredBooks, newBook],
    allBooks: [...allBooks, newBook],
  };
};

const updateBook = (state, bookId, payload) => {
  let targetBookIndex = state.allBooks.findIndex((b) => b._id === bookId);
  const updatedBooks = [...state.allBooks];
  updatedBooks[targetBookIndex] = { ...payload };
  return { ...state, filteredBooks: updatedBooks, allBooks: updatedBooks };
};

const searchBooks = (state, filter) => {
  const { allBooks, bookDetails } = state;

  if (!filter) {
    return { allBooks, filteredBooks: allBooks, bookDetails };
  }

  const filteredBooks = allBooks.filter((b) =>
    b.title.toLowerCase().includes(filter)
  );
  return { allBooks, filteredBooks, bookDetails };
};

const viewFavorites = (state) => {
  const { allBooks, filteredBooks } = state;

  const allFavoritesCurrently = filteredBooks.every((b) => b.isFavorite);
  if (allFavoritesCurrently) {
    return { ...state, filteredBooks: allBooks };
  }

  const onlyFavorites = filteredBooks.filter((b) => b.isFavorite);
  return { ...state, filteredBooks: onlyFavorites };
};

const booksState = (
  state = { allBooks: [], filteredBooks: [], bookDetails: null },
  action
) => {
  switch (action.type) {
    case SET_BOOKS:
      return setBooks(action.books);
    case SEARCH_BOOKS:
      return searchBooks(state, action.filter);
    case SET_BOOK_DETAILS:
      return setBookDetails(state, action.bookId);
    case DELETE_BOOK:
      return deleteBook(state, action.bookId);
    case CREATE_BOOK:
      return createBook(state, action.payload);
    case UPDATE_BOOK:
      return updateBook(state, action.bookId, action.payload);
    case VIEW_FAVORITES:
      return viewFavorites(state);
    default:
      return state;
  }
};

export default booksState;
