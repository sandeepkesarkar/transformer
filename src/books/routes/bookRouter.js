const express = require('express');

import bookModel from '../models/bookModel';
import booksController from '../controllers/booksController';

var bookRoutes = function() {
  const bookRouter = express.Router();
  const controller = booksController();

  bookRouter
    .route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.use('/book/:bookId', (req, res, next) => {
    bookModel.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(400);
    });
  });

  bookRouter
    .route('/book/:bookId')
    .get((req, res) => {
      console.log(`Value of req.book in get method is ${req.book}`);
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
};

module.exports = bookRoutes;
