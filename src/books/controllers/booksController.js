import bookModel from '../models/bookModel';

var booksController = function() {
  function post(req, res) {
    const book = new bookModel(req.body);
    book.save();
    return res.status(200).json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    bookModel.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  return {
    post,
    get
  };
};

module.exports = booksController;
