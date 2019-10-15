import {
  SET_BOOKS,
  SET_CURRENT_BOOK,
  ADD_BOOK,
  REMOVE_BOOK
} from "./actionTypes";

export const setBooks = books => ({
  type: SET_BOOKS,
  payload: books
});

export const setCurrentBook = currentBook => ({
  type: SET_CURRENT_BOOK,
  payload: currentBook
});

export const addBook = book => ({
  type: ADD_BOOK,
  payload: book
});

export const removeBook = bookId => ({
  type: REMOVE_BOOK,
  payload: bookId
});
