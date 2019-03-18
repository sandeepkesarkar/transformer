import { logger } from "../../helpers/logHelper";
const bookDao = require("../dao/bookDao");

var bookController = function() {
  /**
   * Post method handler
   */
  function post(req, res) {
    logger.debug("Inside controller post...");
    const books = bookDao
      .saveNewBook(req.body)
      .then(books => {
        return books;
      })
      .catch(err => {
        logger.error(
          `Error occured while calling function bookDao.saveNewBook: ${err}`
        );
        return {};
      });
    logger.debug(
      `Inside controller post -- Printing req.... ${JSON.stringify(req)}`
    );
    logger.debug(
      `Inside controller post -- Printing res.... ${JSON.stringify(res)}`
    );
    logger.debug(
      `Inside controller post -- Printing books.... ${JSON.stringify(books)}`
    );
    logger.debug("Before calling testFun()");
    res.test();
    logger.debug("After calling testFun()");
    logger.debug("Before calling status(200)");
    res.status(200);
    logger.debug("After calling status(200)");

    return res.json(books);
  }

  function get(req, res) {
    logger.debug("INSIDE get from controller");

    bookDao
      .getBooks(req)
      .then(books => {
        logger.debug(books);
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
