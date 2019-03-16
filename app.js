const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

import { bookRoutes } from './src';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mongoose.connect('mongodb://localhost/bookAPI');

const port = process.env.PORT || 3000;

app.use('/api', bookRoutes());

app.get('/', (req, res) => {
  res.send('Welcome to the nodemon APIs...!!1234567');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
