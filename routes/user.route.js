const express = require('express');
const router = express.Router();
const { isValid, isAuthenticated } = require('../middleware/user.middleware');
const { AddUser, login } = require('../models/user.model');

router.post('/register', isValid, async (req, res) => {
  let user = await AddUser(req.body);
  const token = user.generateToken();
  const result = mapToResult(user, token);
  res.header('x-token', token);
  res.status(200).send(result);
});

router.post('/login', async (req, res) => {
  const user = await login(req.body);
  if (!user) {
    res.status(400).send('your entires did not match any of our records');
    return;
  }
  const result = mapToResult(user, user.generateToken());
  res.header('x-token', result.token).send(result);
});

router.get('/', isAuthenticated, async (req, res) => {
  res.send(req.user);
});

// adding the field "token" to the user object.
function mapToResult(user, token) {
  const result = {
    name: user.name,
    email: user.email,
    token
  };
  return result;
}

module.exports = router;
