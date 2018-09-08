const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');

function isAuthenticated(req, res, next) {
  const token = req.header('x-token');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'some_jwt_token');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send('Token is not verified');
  }
}

function isValid(req, res, next) {
  const schema = {
    name: Joi.string()
      .required()
      .min(2)
      .max(50),
    email: Joi.string()
      .required()
      .min(6)
      .max(200),
    password: Joi.string()
      .required()
      .min(5)
      .max(1024)
  };
  const { error } = Joi.validate(req.body, schema, { abortEarly: false });
  if (error) {
    let errorMessages = [];
    error.details.forEach(e => {
      errorMessages.push(e.message);
    });
    res.status(400).send(errorMessages);
  } else next();
}

module.exports.isValid = isValid;
module.exports.isAuthenticated = isAuthenticated;
