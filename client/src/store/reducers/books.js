import { SET_BOOKS, SEARCH_BOOKS } from "../actions/names";

const setBooks = (books) => {
  return { allBooks: books, filteredBooks: books };
};

const searchBooks = (state, filter) => {
  if (!filter) {
    return { allBooks: state.allBooks, filteredBooks: state.allBooks };
  }

  const filteredBooks = state.allBooks.filter((b) =>
    b.title.toLowerCase().includes(filter)
  );
  return { allBooks: state.allBooks, filteredBooks };
};

const booksState = (
  state = { allBooks: [], filteredBooks: [], book: null },
  action
) => {
  switch (action.type) {
    case SET_BOOKS:
      return setBooks(action.books);
    case SEARCH_BOOKS:
      return searchBooks(state, action.filter);
    default:
      return state;
  }
};

export default booksState;
