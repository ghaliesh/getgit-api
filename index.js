const express = require('express');
const mongoose = require('mongoose');
const moragn = require('morgan');
const user = require('./routes/user.route');
const git = require('./routes/git.route');
const app = express();
app.use(express.json());

mongoose
  .connect(
    'mongodb://localhost:27017/getgit',
    { useNewUrlParser: true }
  )
  .then(res => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

if (process.env.NODE_ENV == 'development') {
  app.use(moragn('dev'));
  console.log('Logging is enabled...');
}

app.use('/api/users', user);
app.use('/api/gits', git);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} - ${ENV}`);
});
