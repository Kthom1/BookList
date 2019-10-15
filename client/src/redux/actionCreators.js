import { SET_BOOKS, ADD_BOOK, REMOVE_BOOK } from "./actionTypes";

export const setBooks = books => ({
  type: SET_BOOKS,
  payload: books
});

export const addBook = book => ({
  type: ADD_BOOK,
  payload: book
});

export const removeBook = bookId => ({
  type: REMOVE_BOOK,
  payload: bookId
});
