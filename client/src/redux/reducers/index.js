import {
  SET_BOOKS,
  SET_CURRENT_BOOK,
  ADD_BOOK,
  REMOVE_BOOK
} from "../actionTypes";

const initialState = {
  books: [],
  currentBook: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS: {
      return Object.assign({}, state, { books: action.payload });
    }
    case SET_CURRENT_BOOK: {
      return Object.assign({}, state, { currentBook: action.payload });
    }
    case ADD_BOOK: {
      return Object.assign({}, state, {
        books: [...state.books, action.payload]
      });
    }
    case REMOVE_BOOK: {
      return Object.assign({}, state, {
        books: state.books.filter(book => book._id !== action.payload)
      });
    }
    default:
      return state;
  }
}
