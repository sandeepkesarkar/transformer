import express from 'express';

import Book from '../models/bookModel';

export default class BookRouter {
  constructor() {
    this.expressRouter = express.Router();

    this.expressRouter
      .route('/books')
      .post((req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(200).json(book);
      })
      .get((req, res) => {
        const query = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
          if (err) {
            return res.send(err);
          }
          return res.json(books);
        });
      });

    this.expressRouter.use('/book/:bookId', (req, res, next) => {
      Book.findById(req.params.bookId, (err, book) => {
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

    this.expressRouter
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
        book.save();
        req.book.save(err => {
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
      });
  }

  get bookRouter() {
    return this.expressRouter;
  }
}
