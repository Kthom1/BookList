import {
  SET_BOOKS,
  SET_CURRENT_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
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
    case UPDATE_BOOK: {
      const replaceIndex = state.books.findIndex(
        book => book._id === action.payload._id
      );
      let cloneArray = [...state.books];
      cloneArray[replaceIndex] = action.payload;
      return Object.assign({}, state, {
        books: cloneArray
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
