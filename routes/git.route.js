const express = require('express');
const router = express.Router();
const { getGits, addGit } = require('../models/git.model');
const { isAuthenticated } = require('../middleware/user.middleware');
const { isValid } = require('../middleware/git.middleware');

router.get('/', isAuthenticated, async (req, res) => {
  const result = await getGits(req.user._id);
  res.status(200).send(result);
});

router.post('/create', isValid, isAuthenticated, async (req, res) => {
  const result = await addGit(req.body, req.user._id);
  console.log(result);
  res.status(200).send(result);
});

module.exports = router;
