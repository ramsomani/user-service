const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

console.log('CONFIG', config)

if(!config.get('jwtPrivateKey')){
  console.log(typeof config, config)
  console.log('JwtPrivateKey is not defined');
  process.exit(1);
}

console.log('ENV', config.get('jwtPrivateKey'))

mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));