const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());

const postsRoute = require('./routes/post');
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.send('We are on home');
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useFindAndModify: false}, () => {
  console.log('connected to DB!');
});

app.listen(3000);
