const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'dance-machine'
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Middleware
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

// Routes
const routes = require('./routes')
app.use('/', routes)
app.use('/uploads', express.static('uploads'))


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;