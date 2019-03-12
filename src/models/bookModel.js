import {model, Schema} from 'mongoose';

const bookModel = new Schema({
  title: {type: String},
  author: {type: String},
  genre: {type: String},
  read: {type: Boolean, default: false}
});

module.exports = model('book', bookModel);
