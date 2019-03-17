import bookDao from "../dao/bookDao";

var bookController = function() {
  // Initialize the DAO object to be used by API keyword functions
  const bookDaoObj = bookDao();

  /**
   * Post method handler
   */
  function post(req, res) {
    bookDaoObj.saveBook(req.body).then(book => {
      return res.status(200).json(book);
    });
  }

  function get(req, res) {
    bookDaoObj
      .getBooks(req)
      .then(books => {
        return res.json(books);
      })
      .catch(err => {
        console.log(err);
        return res.send("Books not found");
      });
  }

  return {
    post,
    get
  };
};

module.exports = bookController;
