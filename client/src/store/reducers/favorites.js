import { TOGGLE_FAVORITE } from "../actions/names";

const toggleFavorite = (state, book) => {
  const targetBook = state.favoriteBooks.find((b) => b._id === book._id);

  //if book is not found, we need to add it to favorites
  if (!targetBook) {
    return { favoriteBooks: [...state.favoriteBooks, book] };
  }

  //if book is found, we need to remove it from favorites
  const filteredBooks = state.favoriteBooks.filter((b) => b._id !== book._id);
  return { favoriteBooks: filteredBooks };
};

const favoritesState = (state = { favoriteBooks: [] }, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return toggleFavorite(state, action.bookId);
    default:
      return state;
  }
};

export default favoritesState;
