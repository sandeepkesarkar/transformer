import BookModel from "../models/bookModel";

import { logger } from "../../helpers/logHelper";
/**
 * Book DAO function to handle DB related operations
 */
var bookDao = (function() {
  /**
   * Save a new book to DB
   */
  function saveNewBook(bookRequest) {
    logger.debug("Inside saveNewBook.........");
    const book = new BookModel(bookRequest);
    return book.save();
  }

  function getBooks(bookRequest) {
    if (bookRequest.query.hasOwnProperty("genre") && bookRequest.query.genre) {
      return getBooksByGenre(bookRequest.query.genre);
    } else {
      return getAllBooks();
    }
  }

  function getAllBooks() {
    const query = {};
    return BookModel.find(query);
  }

  function getBooksByGenre(bookGenre) {
    const query = { genre: bookGenre };
    return BookModel.find(query);
  }

  return {
    saveNewBook,
    getBooks
  };
})();

module.exports = bookDao;
