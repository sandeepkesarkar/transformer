import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import AppMain from './src/appMain';
import BookRouter from './src/routes/bookRouter';
/**
 * Call the greetings function to get going
 */
console.log(AppMain.greetings()); // eslint-disable-line no-console
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mongoose.connect('mongodb://localhost/bookAPI');

const port = process.env.PORT || 3000;

app.use('/api', new BookRouter().bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the nodemon APIs...!!1234567');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
