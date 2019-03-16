import { bookRoutes } from './src';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api', bookRoutes());

app.get('/', (req, res) => {
  res.send('Welcome to the nodemon APIs...!!1234567');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
