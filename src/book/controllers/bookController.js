import { logger } from "../../helpers/logHelper";
const bookDao = require("../dao/bookDao");

var bookController = function() {
  /**
   * Post method handler
   */
  function post(req, res) {
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    bookDao
      .saveNewBook(req.body)
      .then(book => {
        res.status(201);
        return res.json(book);
      })
      .catch(err => {
        logger.error(
          `Error occured while calling function bookDao.saveNewBook: ${err}`
        );
        return {};
      });
  }

  function get(req, res) {
    bookDao
      .getBooks(req)
      .then(books => {
        return res.json(books);
      })
      .catch(err => {
        logger.error(err);
        return res.send("Books not found");
      });
  }

  return {
    post,
    get
  };
};

module.exports = bookController;
