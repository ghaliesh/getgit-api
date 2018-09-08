const Joi = require('joi');

function isValid(req, res, next) {
  const schema = {
    name: Joi.string().required(),
    git_url: Joi.string().required(),
    license: Joi.string(),
    issues: Joi.number(),
    language: Joi.string()
  };
  const { error } = Joi.validate(req.body, schema, { abortEarly: false });
  if (!error) {
    next();
  } else {
    let errorMessages = [];
    error.details.forEach(e => errorMessages.push(e.message));
    res.status(400).send(errorMessages);
  }
}

module.exports = { isValid };
